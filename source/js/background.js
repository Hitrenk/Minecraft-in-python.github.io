$(document).ready(function(){
	const SEPARATION = 100,
		AMOUNTX = 20,
		AMOUNTY = 20;
	
	const scene = new THREE.Scene();
	scene.fog = new THREE.Fog("#fff", 0.01, 3000);

	const point_light = new THREE.PointLight(0xffffff);
	point_light.position.set(1000, 206, 1000);
	scene.add(point_light);
	const ambient_light = new THREE.AmbientLight(0x444444);
	scene.add(ambient_light);
	
	let WIDTH = window.innerWidth, HEIGHT = window.innerHeight;
	const camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 10000);
	camera.position.set(0, 206, 0);
	camera.lookAt(scene.position);
	const control = new THREE.DeviceOrientationControls(camera);
	
	const renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setSize(WIDTH, HEIGHT);
	renderer.setClearColor(0xffffff, 1);
	renderer.domElement.style.margin = "0";
	document.body.appendChild(renderer.domElement);
	renderer.render(scene, camera);
	
	window.addEventListener("resize", function(){
		WIDTH = window.innerWidth,
		HEIGHT = window.innerHeight;
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	});
	
	const body = [];
	for (let i = 0; i < AMOUNTX; i ++){
		body[i] = [];
		for (let j = 0; j < AMOUNTY; j ++){
			const material = new THREE.MeshLambertMaterial({
				color: 0x0066ff
			});
			const geometry =  new THREE.SphereGeometry(1, 16, 16);
			const mesh = new THREE.Mesh(geometry, material);
			mesh.position.x = i * SEPARATION - (AMOUNTX * SEPARATION) / 2,
			mesh.position.y = 0,
			mesh.position.z = j * SEPARATION - (AMOUNTY * SEPARATION) / 2;
			body[i][j] = mesh;
			scene.add(mesh);
		}
	}
	
	let T0 = +new Date(), count = 0;
	function render(){
		const t = new Date() - T0;
		T0 = new Date();
		count += t / 300;
		requestAnimationFrame(render);
		renderer.render(scene, camera);
		if (window.DeviceOrientationEvent) {
			control.update();
		}
		for (let i = 0; i < body.length; i ++){
			for (let j = 0; j < body[i].length; j ++){
				body[i][j].position.y = Math.sin((i + count) * 0.3) * 50 +
					Math.sin((j + count) * 0.5) * 50;
				body[i][j].scale.setScalar(
					(Math.sin((i + count) * 0.3) + 1.3) * 4 +

					(Math.sin((j + count) * 0.5) + 1.3) * 4
				);

			}
		}
	}
	render(); //开始渲染
});
