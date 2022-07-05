import React from "react"

import Projects from "./components/projects.jsx"
import Modal from "./components/modal.jsx"

export default class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {data : [], modalData: {}}
        this.showModal = this.showModal.bind(this)

    }

    componentDidMount() {
        // Fetch the data on the projects
        fetch("/static/projects.json")
        .then((res) => res.json())
        .then((data) => {
            this.setState({data : data})
        })
    }

    showModal(project) {
        $("#modalCarousel").carousel(0)

        // Show the modal with the project data that matches the slug
        this.setState({modalData : project}, () => {
            $('#modal').modal('show')
        })
    }

    render() {
        return (
            <div>
                <div>

                    <Modal modalData={this.state.modalData}/>

                    <div className="row">
                        <div className="col">
                            <div className="d-flex align-items-center justify-content-center" id="overlay">
                                <div className="text-center p-5" id="overlayContent">
                                    <h1>Robert Thierry</h1>
                                    <h2>I am a developer who loves making things!</h2>
                                    <a onClick={() => {
                                        $('html').animate({
                                            scrollTop: $("#projectCards").offset().top
                                        }, 1000);
                                    }} className="btn btn-custom btn-lg mt-3">My Projects</a>
                                </div>
                            </div>
                            <div id="threejsScene" className="w-100"></div>
                        </div>
                        
                    </div>

                </div>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Projects projectData={this.state.data} showModal={this.showModal}/>
                        </div>
                    </div>
                </div>

                <div id="footer">
                    <div className="row">
                        <div className="col">
                            <div className="d-flex flex-column align-items-center justify-content-center m-5">
                                <div className="mb-3">
                                    <button className="btn-custom icon-btn mx-2" onClick={() => {window.location = "https://www.linkedin.com/in/robert-thierry-3405a4243/"}}><i class="fa-brands fa-linkedin"></i></button>
                                    <button className="btn-custom icon-btn mx-2" onClick={() => {window.location = "https://github.com/Bobbyt1500"}}><i class="fa-brands fa-github"></i></button>
                                </div>
                                <span className="align-middle"><i class="fa-solid fa-mobile-screen-button icon-color"></i> 610-314-6692</span>
                                <span className="align-middle"><i class="fa-solid fa-envelope icon-color"></i> bthierry1500@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}