import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export default class SceneController {
    constructor() {
        
        // Setup Renderer
        this.element = $("#threejsScene")

        this.renderer = new THREE.WebGLRenderer({antialias: true})
        this.renderer.setSize(this.element.innerWidth(), this.element.innerHeight())
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        this.element.append(this.renderer.domElement)

        let isMobileWidth = this.element.innerWidth() <= 1200

        this.sizex = isMobileWidth ? 7 : 10
        this.sizey = isMobileWidth ? 7 : 10

        this.balls = []
        this.numballs = isMobileWidth ? 5 : 8
        
        // Setup Camera and Scene
        this.initScene()

        // Setup Lighting
        this.initLights()

        // Setup Mouse Listener
        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2(1, 1)

        window.addEventListener('pointermove', (event) => {
            let canvasBounds = this.element[0].getBoundingClientRect()
            this.mouse.x = ((event.clientX - canvasBounds.left) / (canvasBounds.right - canvasBounds.left)) * 2 - 1;
            this.mouse.y = - ((event.clientY - canvasBounds.top) / (canvasBounds.bottom - canvasBounds.top)) * 2 + 1;
        });

        window.addEventListener('touchend', (event) => {
            let canvasBounds = this.element[0].getBoundingClientRect()
            this.mouse.x = ((event.changedTouches[0].clientX - canvasBounds.left) / (canvasBounds.right - canvasBounds.left)) * 2 - 1;
            this.mouse.y = - ((event.changedTouches[0].clientY - canvasBounds.top) / (canvasBounds.bottom - canvasBounds.top)) * 2 + 1;
            
        });

        // Setup Resize Listener
        window.addEventListener('resize', () => {
            let width = this.element.innerWidth()
            let height = this.element.innerHeight()
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
            
            this.sizex = this.element.innerWidth() <= 1200 ? 7 : 12
            this.sizey = this.element.innerWidth() <= 1200 ? 7 : 12

        }, false);

        // Render the Scene
        this.renderer.render(this.scene, this.camera)

        // Begin animation
        this.animate()
        
    }

    getRandomInt(min, max) {
        return min + Math.floor(Math.random() * (Math.abs(min) + Math.abs(max)))
    }

    initScene() {
        this.scene = new THREE.Scene()
        let sceneColor = 0x1E1E2A;
        this.scene.background = new THREE.Color(0x16161D);

        this.camera = new THREE.PerspectiveCamera(75, this.element.innerWidth() / this.element.innerHeight(), 0.1, 1000)

        let geometry = new THREE.BoxGeometry(100, 2, 100)
        let material = new THREE.MeshPhongMaterial({color: sceneColor})
        let base = new THREE.Mesh(geometry, material)

        this.scene.add(base)

        this.createBalls()

        this.camera.position.z = 12
        this.camera.position.x = 10
        this.camera.position.y = 10
        this.camera.lookAt(0, 0, 0)
    }

    initLights() {
        let pointLight0 = new THREE.PointLight(0xffffff, 0.7, 100)
        pointLight0.position.set(0, 20, 25)
        pointLight0.castShadow = true
        this.scene.add(pointLight0)

        let ambLight = new THREE.AmbientLight( 0xcccccc )
        this.scene.add(ambLight)
    }

    createBalls() {
        // Dark, bright
        let colors = [[0x001163, 0x0021bf], [0x822900, 0xdb4500], [0x570600, 0xd10e00], [0x0f2b00, 0x3fb500], [0x850066, 0x9c008c], [0x7a5a00, 0xff7700], [0x003261, 0x00a2ff]]

        let loader = new GLTFLoader()

        for (var i = 0; i < this.numballs; ++i) {
            let color = colors[this.getRandomInt(0, colors.length)]
            let ballMaterial = new THREE.MeshPhongMaterial({color: color[0], emissive: color[1]})
            ballMaterial.shininess = 20

            // Choose a random model from the number of files
            let file = this.getRandomInt(0, 4)

            loader.load(`static/models/fractured${file}.glb`, (gltf) => {

                let object = gltf.scene
                let animations = gltf.animations
                let mixer = new THREE.AnimationMixer(object)
                let x = this.getRandomInt(-this.sizex, this.sizex)
                let y = this.getRandomInt(-this.sizey, this.sizey)
                object.position.set(x, 2, y)

                object.traverse((o) => {
                    if (o.type == "Mesh") {
                        o.material = ballMaterial
                    }
                })

                let glowLight = new THREE.PointLight(color[0], 5, 5)
                glowLight.position.set(x, 3, y)
                glowLight.castShadow = true
                this.scene.add(glowLight)

                object.attach(glowLight)

                this.balls.push({
                    object: object,
                    animations: animations,
                    mixer: mixer,
                    light: glowLight,
                    clock: new THREE.Clock(),
                    animateSeed: Math.random() * 6 - 3,
                    playing: false
                })

                this.scene.add(object)
            
            }, undefined, (error) => {console.log(error)}) 
        }
        

    }

    animate() {
        requestAnimationFrame(() => {this.animate()})

        this.raycaster.setFromCamera(this.mouse, this.camera);
        let balls = this.balls

        if (balls.length > 0) {

            for (var i = 0; i < balls.length; ++i) {
                let ball = balls[i]

                let intersects = this.raycaster.intersectObjects(ball.object.children);

                //On mouse over 
                if (intersects.length !== 0) {
                    
                    if (!ball.playing) {
                        ball.playing = true
                        ball.light.intensity = 0

                        ball.mixer.addEventListener('finished', (e) => {
                            let x = this.getRandomInt(-this.sizex, this.sizex)
                            let y = this.getRandomInt(-this.sizey, this.sizey)
                            ball.object.position.set(x, 2, y)
                            ball.playing = false
                            ball.mixer = new THREE.AnimationMixer(ball.object)
                            ball.clock = new THREE.Clock()
                            ball.light.intensity = 3
                        })

                        ball.animations.forEach((clip) => {
                            let action = ball.mixer.clipAction(clip).play()
                            action.setLoop(THREE.LoopOnce)
                        })
                    }

                }

                
                if (ball.playing) {
                    ball.mixer.update(ball.clock.getDelta())
                } else {
                    ball.object.position.y = 2 + (Math.cos(ball.animateSeed += 0.01) * 0.5)
                }
        
            }

        }

        this.renderer.render(this.scene, this.camera)
    }
}