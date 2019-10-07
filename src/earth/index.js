import template from './index.html';
import './style.scss';
import * as THREE from 'three';
import { SoftwareRenderer } from './softwareRenderer.js';


export default class {
	mount(container) {
		document.title = 'earth'
		container.innerHTML = template
		var container;
		var camera, scene, renderer;
		var group;
		var mouseX = 0, mouseY = 0;
		var windowHalfX = window.innerWidth / 2;
		var windowHalfY = window.innerHeight / 2;
		init();
		animate();
		function init() {
			container = document.getElementById('container');
			camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
			camera.position.z = 500;
			scene = new THREE.Scene();
			group = new THREE.Group();
			scene.add(group);
		//   scene.background = new THREE.Color(0xffffff)
			// earth
			var loader = new THREE.TextureLoader();
			loader.load('src/earth/textures/fidelity.jpg', function (texture) {
				var geometry = new THREE.SphereBufferGeometry(200, 20, 20);
				var material = new THREE.MeshLambertMaterial({ map: texture });
				var mesh = new THREE.Mesh(geometry, material);
				group.add(mesh);
			});
			
			// shadow
			var canvas = document.createElement('canvas');
			canvas.width = 128;
			canvas.height = 128;
			var context = canvas.getContext('2d');
			var gradient = context.createRadialGradient(
				canvas.width / 2,
				canvas.height / 2,
				0,
				canvas.width / 2,
				canvas.height / 2,
				canvas.width / 2
			);

			gradient.addColorStop(0.1, 'rgba(255,255,255,1)');
			gradient.addColorStop(1, 'rgba(255,255,255,1)');
			context.fillStyle = gradient;
			context.fillRect(0, 0, canvas.width, canvas.height);
			renderer = new SoftwareRenderer();
			renderer.setSize(window.innerWidth, window.innerHeight);
			container.appendChild(renderer.domElement);
			//stats = new Stats();
			//container.appendChild( stats.dom );

			document.addEventListener('mousemove', onDocumentMouseMove, false);
			window.addEventListener('resize', onWindowResize, false);
		}
		function onWindowResize() {
			windowHalfX = window.innerWidth / 2;
			windowHalfY = window.innerHeight / 2;
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		}
		function onDocumentMouseMove(event) {
			mouseX = (event.clientX - windowHalfX);
			mouseY = (event.clientY - windowHalfY);
		}

		function animate() {
			requestAnimationFrame(animate);
			render();
			//stats.update();
		}
		function render() {
			camera.position.x += (mouseX - camera.position.x) * 0.05;
			camera.position.y += (- mouseY - camera.position.y) * 0.05;
			camera.lookAt(scene.position);
			group.rotation.y -= 0.005;
			renderer.render(scene, camera);
		}


	}
}