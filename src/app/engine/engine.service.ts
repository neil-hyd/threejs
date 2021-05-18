import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';
import { ElementRef, Injectable, NgZone, OnDestroy } from '@angular/core';
import { Size } from '../ui/data/shared.model';
import { Store } from '@ngrx/store';
import { selectFOV } from '../store/app.selector';
import { MOUSE } from 'three';

let frustumSize = 400;

@Injectable({providedIn: 'root'})
export class EngineService implements OnDestroy {

  public animationSpeed = 0.00005;

  private renderer: THREE.WebGLRenderer;
  private cameraViewrenderer: THREE.WebGLRenderer;

  private camera: THREE.PerspectiveCamera;

  private columnCamera: THREE.PerspectiveCamera;
  private columnCameraFOV: THREE.PerspectiveCamera;
  private columnCameraFOVHelper: THREE.CameraHelper;

  private columnCameraGroup: THREE.Group;

  private activeCamera: THREE.Camera;
  private activeHelper: THREE.CameraHelper;

  private scene: THREE.Scene;
  private mesh: THREE.Mesh;

  private tableMesh: THREE.Mesh;
  private photoMesh: THREE.Mesh;

  private frameId: number = null;

  private controls: OrbitControls;

  private SCREEN_WIDTH = 320;
  private SCREEN_HEIGHT = 240;
  private aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;

  public constructor(
    private ngZone: NgZone,
    private store: Store
    ) {

      this.store.select(selectFOV).subscribe(s => {
        if (!this.controls) return;
        this.columnCamera.position.setY(s);
        this.columnCameraFOV.position.setY(s);
        this.columnCameraFOV.far = s - 6;
      });
  }

  public ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  public createScene(holder: ElementRef<HTMLElement>, cameraViewHolder: ElementRef<HTMLElement>): void {
    // The first step is to get the reference of the canvas element from our HTML document

    this.SCREEN_WIDTH = window.screen.width;
    this.SCREEN_HEIGHT = window.screen.height;
    this.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;

    this.renderer = new THREE.WebGLRenderer({
      antialias: true // smooth edges
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera( 50, 1, 1, 30000 );

    this.camera.position.x = 500;
    this.camera.position.y = 800;
    this.camera.position.z = 500;

    this.columnCamera = new THREE.PerspectiveCamera( 27.8, 3/2, 1, 30000 );
    this.columnCameraFOV = new THREE.PerspectiveCamera( 27.8, 3/2, 40, 455 );

    this.columnCamera.position.setY(450);
    this.columnCameraFOV.position.setY(450);

    this.columnCameraFOVHelper = new THREE.CameraHelper( this.columnCameraFOV );

    this.scene.add(this.columnCamera);
    this.scene.add(this.columnCameraFOV);
    this.scene.add( this.columnCameraFOVHelper );

    const axesHelper = new THREE.AxesHelper( 400 );
    this.scene.add( axesHelper );

    this.activeCamera = this.columnCamera;
    this.activeHelper = this.columnCameraFOVHelper;

    this.tableMesh = new THREE.Mesh(
      new THREE.BoxGeometry(200, 10, 200, 10, 2, 10),
      new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: false})
    )

    this.scene.add(this.tableMesh);


    const loader = new THREE.TextureLoader();
    const tex = loader.load('assets/Hutt_Valley_History_Early_History_002.tif.jpg');
    //const tex = loader.load('assets/test.png');

    this.photoMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(80 * 1.380444856348471, 80, 16, 9),
      new THREE.MeshBasicMaterial({map: tex, wireframe: false})
    )

    this.photoMesh.position.setY(7);
    this.photoMesh.rotateX(-Math.PI / 2);
    //this.photoMesh.rotateZ(-Math.PI);

    this.scene.add(this.photoMesh);

    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry( 100, 32, 32 ),
      new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: false } )
    );
    //this.mesh.position.setX(-800);

    //this.scene.add( this.mesh );

    const mesh2 = new THREE.Mesh(
      new THREE.SphereGeometry( 50, 16, 8 ),
      new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: false } )
    );

    mesh2.position.y = 150;
    this.mesh.add( mesh2 );

    // const geometry = new THREE.BufferGeometry();
    // const vertices = [];

    // for ( let i = 0; i < 10000; i ++ ) {

    //   vertices.push( 3000 + THREE.MathUtils.randFloatSpread( 5000 ) ); // x
    //   vertices.push( 3000 + THREE.MathUtils.randFloatSpread( 5000 ) ); // y
    //   vertices.push( 3000 + THREE.MathUtils.randFloatSpread( 5000 ) ); // z
    // }

    // geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

    // const particles = new THREE.Points( geometry, new THREE.PointsMaterial( { color: 0x888888 } ) );
    // this.scene.add( particles );


    this.columnCamera.updateProjectionMatrix();
    this.columnCameraFOV.updateProjectionMatrix();

    const width = this.SCREEN_WIDTH / 2;

    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( width, this.SCREEN_HEIGHT );

    this.cameraViewrenderer = new THREE.WebGLRenderer( { antialias: true } );
    this.cameraViewrenderer.setPixelRatio( window.devicePixelRatio );


    const height = width / 3 * 2;
    this.cameraViewrenderer.setSize( width, height );

    holder.nativeElement.appendChild(this.renderer.domElement);
    cameraViewHolder.nativeElement.appendChild(this.cameraViewrenderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    //this.controls.addEventListener( 'change', () => {this.render()} );
    this.controls.enableKeys = true;
    this.controls.enableZoom = true;

    this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this.controls.dampingFactor = 0.5;

    this.controls.update();

    this.renderer.autoClear = false;
    this.cameraViewrenderer.autoClear = false;
  }

  public animate(): void {
    this.frameId = requestAnimationFrame(() => {
      this.ngZone.runOutsideAngular(() => {
        this.render();
      });
    });
  }

  public render() {

    const r = Date.now() * this.animationSpeed;

    // this.mesh.position.x = 700 * Math.cos( r );
    // this.mesh.position.z = 700 * Math.sin( r );
    // this.mesh.position.y = 700 * Math.sin( r );

    this.mesh.children[ 0 ].position.x = 70 * Math.cos( 2 * r );
    this.mesh.children[ 0 ].position.z = 70 * Math.sin( r );

    // this.cameraPerspective.fov = 35 + 30 * Math.sin( 0.5 * r );
    // this.cameraPerspective.far = this.mesh.position.length();
    this.columnCamera.updateProjectionMatrix();
    this.columnCameraFOV.updateProjectionMatrix();

    this.columnCameraFOVHelper.update();
    this.columnCameraFOVHelper.visible = true;

    //this.camera.rotateZ(.001);

    this.columnCamera.lookAt( this.mesh.position );
    this.columnCameraFOV.lookAt( this.mesh.position );
    this.camera.lookAt( this.mesh.position );

    this.renderer.clear();

    this.activeHelper.visible = false;

    const width = this.SCREEN_WIDTH / 2;
    const height = width / 3 * 2;
    //this.renderer.setViewport( 0, 0, width, height );
    this.cameraViewrenderer.render( this.scene, this.activeCamera );



    this.activeHelper.visible = true;

    //this.renderer.setViewport( 0, 0, this.SCREEN_WIDTH / 2, this.SCREEN_HEIGHT );
    this.renderer.render( this.scene, this.camera );
    this.controls.update();
    this.animate();
  }

  public setSize(width: number, height: number) {

    // this.SCREEN_HEIGHT = height;
    // this.SCREEN_WIDTH = width;
    // this.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;

    // this.renderer.setSize( this.SCREEN_WIDTH, this.SCREEN_HEIGHT );

    // this.camera.aspect = 0.5 * this.aspect;
    // this.camera.updateProjectionMatrix();

    // this.columnCamera.aspect = 16 / 9;
    // this.columnCamera.updateProjectionMatrix();
  }
}
