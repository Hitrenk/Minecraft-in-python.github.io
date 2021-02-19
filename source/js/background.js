$(document).ready(function(){
	const SEPARATION = 100,
		AMOUNTX = 20,
		AMOUNTY = 20;
	
	/* 创建场景 */
	const scene = new THREE.Scene();
	scene.fog = new THREE.Fog("#fff", 0.01, 3000);
	
	
	/* 光源设置 */
	//点光源
	const point_light = new THREE.PointLight(0xffffff);
	point_light.position.set(1000, 206, 1000);
	scene.add(point_light);
	//环境光
	const ambient_light = new THREE.AmbientLight(0x444444);
	scene.add(ambient_light);
	
	
	/* 相机设置 */
	let WIDTH = window.innerWidth,
		HEIGHT = window.innerHeight; //窗口宽高
	const camera = new THREE.PerspectiveCamera(45, WIDTH/HEIGHT, 1, 10000);
	camera.position.set(0, 206, 0);
	camera.lookAt(scene.position);
	const control = new THREE.DeviceOrientationControls(camera);
	
	
	/* 创建渲染器对象 */
	const renderer = new THREE.WebGLRenderer({
		antialias: true //抗锯齿
	});
	renderer.setSize(WIDTH, HEIGHT);
	renderer.setClearColor(0xffffff, 1);
	renderer.domElement.style.margin = "0";
	document.body.appendChild( renderer.domElement );
	renderer.render(scene, camera);
	
	//窗口大小调整
	window.addEventListener("resize", function(){
		WIDTH = window.innerWidth,
		HEIGHT = window.innerHeight;
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix(); //更新投影矩阵
	});
	
	
	/* 添加球体 */
	const body = [];
	for (let i=0; i<AMOUNTX; i++){
		body[i] = [];
		for (let j=0; j<AMOUNTY; j++){
			const material = new THREE.MeshLambertMaterial({
				color: 0x00ffff
			}); //材质
			const geometry =  new THREE.SphereGeometry(1, 16, 16); //几何体
			const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
			mesh.position.x = i * SEPARATION - (AMOUNTX * SEPARATION)/2,
			mesh.position.y = 0,
			mesh.position.z = j * SEPARATION - (AMOUNTY * SEPARATION)/2; //设置位置
			body[i][j] = mesh;
			scene.add( mesh ); //加入到场景
		}
	}
	
	
	/* 渲染 */
	let T0 = +new Date(), //上次时间
		count = 0;
	function render(){
		const t = new Date() - T0; //时间差
		T0 = new Date(); //把本次时间赋值给上次时间
		count += t/300;
		requestAnimationFrame(render);
		renderer.render(scene, camera); //执行渲染操作
		
		if (window.DeviceOrientationEvent) //支持陀螺仪
			control.update(); //陀螺仪更新
		
		for (let i=0; i<body.length; i++){
			for (let j=0; j<body[i].length; j++){
				body[i][j].position.y = Math.sin( (i + count)*0.3 ) * 50 +
					Math.sin( (j + count)*0.5 ) * 50; //更新y坐标
				body[i][j].scale.setScalar(
					(Math.sin( (i + count)*0.3 ) +1.3) *8 +

					(Math.sin( (j + count)*0.5 ) +1.3) *8
				);

			}
		}
	}
	render(); //开始渲染
});