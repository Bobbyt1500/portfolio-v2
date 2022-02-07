var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Projects from "./components/projects.js";
import Modal from "./components/modal.js";

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = { data: [], modalData: {} };
        _this.showModal = _this.showModal.bind(_this);

        return _this;
    }

    _createClass(App, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            // Fetch the data on the projects
            fetch("/static/projects.json").then(function (res) {
                return res.json();
            }).then(function (data) {
                _this2.setState({ data: data });
            });
        }
    }, {
        key: "showModal",
        value: function showModal(project) {
            $("#modalCarousel").carousel(0);

            // Show the modal with the project data that matches the slug
            this.setState({ modalData: project }, function () {
                $('#modal').modal('show');
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    null,
                    React.createElement(Modal, { modalData: this.state.modalData }),
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "col" },
                            React.createElement(
                                "div",
                                { className: "d-flex align-items-center justify-content-center", id: "overlay" },
                                React.createElement(
                                    "div",
                                    { className: "text-center p-5", id: "overlayContent" },
                                    React.createElement(
                                        "h1",
                                        null,
                                        "Robert Thierry"
                                    ),
                                    React.createElement(
                                        "h2",
                                        null,
                                        "I am a developer who loves making things!"
                                    ),
                                    React.createElement(
                                        "a",
                                        { onClick: function onClick() {
                                                $('html').animate({
                                                    scrollTop: $("#projectCards").offset().top
                                                }, 1500);
                                            }, className: "btn btn-custom btn-lg mt-3" },
                                        "My Projects"
                                    )
                                )
                            ),
                            React.createElement("div", { id: "threejsScene", className: "w-100" })
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "container" },
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "col" },
                            React.createElement(Projects, { projectData: this.state.data, showModal: this.showModal })
                        )
                    )
                )
            );
        }
    }]);

    return App;
}(React.Component);

export default App;