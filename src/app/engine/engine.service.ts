import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';
import { ElementRef, Injectable, NgZone, OnDestroy } from '@angular/core';
import { Size } from '../ui/data/shared.model';

let frustumSize = 400;

@Injectable({providedIn: 'root'})
export class EngineService implements OnDestroy {

  public animationSpeed = 0.00005;

  private renderer: THREE.WebGLRenderer;

  private camera: THREE.PerspectiveCamera;
  private cameraPerspective: THREE.PerspectiveCamera;
  private cameraPerspectiveHelper: THREE.CameraHelper;

  private cameraOrtho: THREE.OrthographicCamera;
  private cameraOrthoHelper: THREE.CameraHelper;

  private activeCamera: THREE.Camera;
  private activeHelper: THREE.CameraHelper;

  private scene: THREE.Scene;
  private mesh: THREE.Mesh;
  private planeMesh: THREE.Mesh;
  private mesh3: THREE.Mesh;
  private cameraRig: THREE.Group;
  private frameId: number = null;
  private frustumSize = 600;

  private controls: OrbitControls;

  private SCREEN_WIDTH = 320;
  private SCREEN_HEIGHT = 240;
  private aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;

  public constructor(private ngZone: NgZone) {
  }

  public ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  public createScene(holder: ElementRef<HTMLElement>): void {
    // The first step is to get the reference of the canvas element from our HTML document

    this.SCREEN_WIDTH = holder.nativeElement.clientWidth;
    this.SCREEN_HEIGHT = holder.nativeElement.clientHeight;
    this.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;

    this.renderer = new THREE.WebGLRenderer({
      antialias: true // smooth edges
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera( 50, 0.5 * this.aspect, 1, 10000 );
    this.camera.position.z = 2500;

    this.controls = new OrbitControls(this.camera, holder.nativeElement);
    this.controls.update();

    this.cameraPerspective = new THREE.PerspectiveCamera( 50, 0.5 * this.aspect, 400, 1000 );

    this.cameraPerspectiveHelper = new THREE.CameraHelper( this.cameraPerspective );
    this.scene.add( this.cameraPerspectiveHelper );

    this.cameraOrtho = new THREE.OrthographicCamera(
      0.5 * this.frustumSize * this.aspect / - 2,
      0.5 * this.frustumSize * this.aspect / 2,
      this.frustumSize / 2,
      this.frustumSize / - 2,
      800,
      1000 );

    this.cameraOrthoHelper = new THREE.CameraHelper( this.cameraOrtho );
    this.scene.add( this.cameraOrthoHelper );

    this.activeCamera = this.cameraPerspective;
    this.activeHelper = this.cameraPerspectiveHelper;

    this.cameraOrtho.rotation.y = Math.PI;
    this.cameraPerspective.rotation.y = Math.PI;

    this.cameraRig = new THREE.Group();

    this.cameraRig.add(this.cameraPerspective);
    this.cameraRig.add(this.cameraOrtho);

    this.scene.add(this.cameraRig);

    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry( 100, 7, 5 ),
      new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } )
    );

    this.mesh.position.x = 700 * Math.cos( .1 );
    this.mesh.position.z = 700 * Math.sin( 0 );
    this.mesh.position.y = 700 * Math.sin( 1 );

    this.scene.add( this.mesh );

    const mesh2 = new THREE.Mesh(
      new THREE.SphereGeometry( 50, 16, 8 ),
      new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } )
    );
    mesh2.position.y = 150;
    this.mesh.add( mesh2 );

    const mesh3 = new THREE.Mesh(
      new THREE.SphereGeometry( 5, 16, 8 ),
      new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: true } )
    );
    mesh3.position.z = 400;
    this.cameraRig.add( mesh3 );

    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for ( let i = 0; i < 10000; i ++ ) {

      vertices.push( THREE.MathUtils.randFloatSpread( 20000 ) ); // x
      vertices.push( THREE.MathUtils.randFloatSpread( 20000 ) ); // y
      vertices.push( THREE.MathUtils.randFloatSpread( 20000 ) ); // z
    }

    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

    const particles = new THREE.Points( geometry, new THREE.PointsMaterial( { color: 0x888888 } ) );
    this.scene.add( particles );

    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( this.SCREEN_WIDTH, this.SCREEN_HEIGHT );

    holder.nativeElement.appendChild(this.renderer.domElement);

    this.renderer.autoClear = false;
  }

  public animate(): void {
    this.frameId = requestAnimationFrame(() => {
      this.ngZone.runOutsideAngular(() => {
        this.render();
      });
    });
  }

  onKeyDown( event ) {

    switch ( event.keyCode ) {

      case 79: /*O*/

        this.activeCamera = this.cameraOrtho;
        this.activeHelper = this.cameraOrthoHelper;

        break;

      case 80: /*P*/

        this.activeCamera = this.cameraPerspective;
        this.activeHelper = this.cameraPerspectiveHelper;

        break;

    }

  }

  public render() {

    const r = Date.now() * this.animationSpeed;

    this.mesh.position.x = 700 * Math.cos( r );
    this.mesh.position.z = 700 * Math.sin( r );
    this.mesh.position.y = 700 * Math.sin( r );

    this.mesh.children[ 0 ].position.x = 70 * Math.cos( 2 * r );
    this.mesh.children[ 0 ].position.z = 70 * Math.sin( r );

    if ( this.activeCamera === this.cameraPerspective ) {

      this.cameraPerspective.fov = 35 + 30 * Math.sin( 0.5 * r );
      this.cameraPerspective.far = this.mesh.position.length();
      this.cameraPerspective.updateProjectionMatrix();

      this.cameraPerspectiveHelper.update();
      this.cameraPerspectiveHelper.visible = true;

      this.cameraOrthoHelper.visible = false;

    } else {

      this.cameraOrtho.far = this.mesh.position.length();
      this.cameraOrtho.updateProjectionMatrix();

      this.cameraOrthoHelper.update();
      this.cameraOrthoHelper.visible = true;

      this.cameraPerspectiveHelper.visible = false;

    }

    this.camera.rotateZ(.001);

    this.cameraRig.lookAt( this.mesh.position );
    this.camera.lookAt( this.cameraOrthoHelper.position );

    this.renderer.clear();

    this.activeHelper.visible = false;

    this.renderer.setViewport( 0, 0, this.SCREEN_WIDTH / 2, this.SCREEN_HEIGHT );
    this.renderer.render( this.scene, this.activeCamera );

    this.activeHelper.visible = true;

    this.renderer.setViewport( this.SCREEN_WIDTH / 2, 0, this.SCREEN_WIDTH / 2, this.SCREEN_HEIGHT );
    this.renderer.render( this.scene, this.camera );
    this.animate();
  }

  public setSize(width: number, height: number) {

    this.SCREEN_HEIGHT = height;
    this.SCREEN_WIDTH = width;
    this.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;

    this.renderer.setSize( this.SCREEN_WIDTH, this.SCREEN_HEIGHT );

    this.camera.aspect = 0.5 * this.aspect;
    this.camera.updateProjectionMatrix();

    this.cameraPerspective.aspect = 0.5 * this.aspect;
    this.cameraPerspective.updateProjectionMatrix();

    this.cameraOrtho.left = - 0.5 * frustumSize * this.aspect / 2;
    this.cameraOrtho.right = 0.5 * frustumSize * this.aspect / 2;
    this.cameraOrtho.top = frustumSize / 2;
    this.cameraOrtho.bottom = - frustumSize / 2;
    this.cameraOrtho.updateProjectionMatrix();
  }
}
