var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SceneController = function () {
    function SceneController() {
        var _this = this;

        _classCallCheck(this, SceneController);

        // Setup Renderer
        this.element = $("#threejsScene");

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.element.innerWidth(), this.element.innerHeight());
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.element.append(this.renderer.domElement);

        this.sizex = this.element.innerWidth() <= 1200 ? 7 : 10;
        this.sizey = this.element.innerWidth() <= 1200 ? 7 : 10;

        this.balls = [];
        this.numballs = 8;

        // Setup Camera and Scene
        this.initScene();

        // Setup Lighting
        this.initLights();

        // Setup Mouse Listener
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2(1, 1);

        window.addEventListener('pointermove', function (event) {
            var canvasBounds = _this.element[0].getBoundingClientRect();
            _this.mouse.x = (event.clientX - canvasBounds.left) / (canvasBounds.right - canvasBounds.left) * 2 - 1;
            _this.mouse.y = -((event.clientY - canvasBounds.top) / (canvasBounds.bottom - canvasBounds.top)) * 2 + 1;
        });

        window.addEventListener('touchend', function (event) {
            var canvasBounds = _this.element[0].getBoundingClientRect();
            _this.mouse.x = (event.changedTouches[0].clientX - canvasBounds.left) / (canvasBounds.right - canvasBounds.left) * 2 - 1;
            _this.mouse.y = -((event.changedTouches[0].clientY - canvasBounds.top) / (canvasBounds.bottom - canvasBounds.top)) * 2 + 1;
        });

        // Setup Resize Listener
        window.addEventListener('resize', function () {
            var width = _this.element.innerWidth();
            var height = _this.element.innerHeight();
            _this.camera.aspect = width / height;
            _this.camera.updateProjectionMatrix();
            _this.renderer.setSize(width, height);

            _this.sizex = _this.element.innerWidth() <= 1200 ? 7 : 12;
            _this.sizey = _this.element.innerWidth() <= 1200 ? 7 : 12;
        }, false);

        // Render the Scene
        this.renderer.render(this.scene, this.camera);

        // Begin animation
        this.animate();
    }

    _createClass(SceneController, [{
        key: 'getRandomInt',
        value: function getRandomInt(min, max) {
            return min + Math.floor(Math.random() * (Math.abs(min) + Math.abs(max)));
        }
    }, {
        key: 'initScene',
        value: function initScene() {
            this.scene = new THREE.Scene();
            var sceneColor = 0x1E1E2A;
            this.scene.background = new THREE.Color(0x16161D);

            this.camera = new THREE.PerspectiveCamera(75, this.element.innerWidth() / this.element.innerHeight(), 0.1, 1000);

            var geometry = new THREE.BoxGeometry(100, 2, 100);
            var material = new THREE.MeshPhongMaterial({ color: sceneColor });
            var base = new THREE.Mesh(geometry, material);

            this.scene.add(base);

            this.createBalls();

            this.camera.position.z = 12;
            this.camera.position.x = 10;
            this.camera.position.y = 10;
            this.camera.lookAt(0, 0, 0);
        }
    }, {
        key: 'initLights',
        value: function initLights() {
            var pointLight0 = new THREE.PointLight(0xffffff, 0.7, 100);
            pointLight0.position.set(0, 20, 25);
            pointLight0.castShadow = true;
            this.scene.add(pointLight0);

            var ambLight = new THREE.AmbientLight(0xcccccc);
            this.scene.add(ambLight);
        }
    }, {
        key: 'createBalls',
        value: function createBalls() {
            var _this2 = this;

            // Dark, bright
            var colors = [[0x001163, 0x0021bf], [0x822900, 0xdb4500], [0x570600, 0xd10e00], [0x0f2b00, 0x3fb500], [0x850066, 0x9c008c], [0x7a5a00, 0xff7700], [0x003261, 0x00a2ff]];

            var loader = new THREE.GLTFLoader();

            var _loop = function _loop() {
                var color = colors[_this2.getRandomInt(0, colors.length)];
                var ballMaterial = new THREE.MeshPhongMaterial({ color: color[0], emissive: color[1] });
                ballMaterial.shininess = 20;

                // Choose a random model from the number of files
                var file = _this2.getRandomInt(0, 4);

                loader.load('static/models/fractured' + file + '.glb', function (gltf) {

                    var object = gltf.scene;
                    var animations = gltf.animations;
                    var mixer = new THREE.AnimationMixer(object);
                    var x = _this2.getRandomInt(-_this2.sizex, _this2.sizex);
                    var y = _this2.getRandomInt(-_this2.sizey, _this2.sizey);
                    object.position.set(x, 2, y);

                    object.traverse(function (o) {
                        if (o.type == "Mesh") {
                            o.material = ballMaterial;
                        }
                    });

                    var glowLight = new THREE.PointLight(color[0], 5, 5);
                    glowLight.position.set(x, 3, y);
                    glowLight.castShadow = true;
                    _this2.scene.add(glowLight);

                    object.attach(glowLight);

                    _this2.balls.push({
                        object: object,
                        animations: animations,
                        mixer: mixer,
                        light: glowLight,
                        clock: new THREE.Clock(),
                        animateSeed: Math.random() * 6 - 3,
                        playing: false
                    });

                    _this2.scene.add(object);
                }, undefined, function (error) {
                    console.log(error);
                });
            };

            for (var i = 0; i < this.numballs; ++i) {
                _loop();
            }
        }
    }, {
        key: 'animate',
        value: function animate() {
            var _this3 = this;

            requestAnimationFrame(function () {
                _this3.animate();
            });

            this.raycaster.setFromCamera(this.mouse, this.camera);
            var balls = this.balls;

            if (balls.length > 0) {
                var _loop2 = function _loop2() {
                    var ball = balls[i];

                    var intersects = _this3.raycaster.intersectObjects(ball.object.children);

                    //On mouse over 
                    if (intersects.length !== 0) {

                        if (!ball.playing) {
                            ball.playing = true;
                            ball.light.intensity = 0;

                            ball.mixer.addEventListener('finished', function (e) {
                                var x = _this3.getRandomInt(-_this3.sizex, _this3.sizex);
                                var y = _this3.getRandomInt(-_this3.sizey, _this3.sizey);
                                ball.object.position.set(x, 2, y);
                                ball.playing = false;
                                ball.mixer = new THREE.AnimationMixer(ball.object);
                                ball.clock = new THREE.Clock();
                                ball.light.intensity = 3;
                            });

                            ball.animations.forEach(function (clip) {
                                var action = ball.mixer.clipAction(clip).play();
                                action.setLoop(THREE.LoopOnce);
                            });
                        }
                    }

                    if (ball.playing) {
                        ball.mixer.update(ball.clock.getDelta());
                    } else {
                        ball.object.position.y = 2 + Math.cos(ball.animateSeed += 0.01) * 0.5;
                    }
                };

                for (var i = 0; i < balls.length; ++i) {
                    _loop2();
                }
            }

            this.renderer.render(this.scene, this.camera);
        }
    }]);

    return SceneController;
}();

export default SceneController;