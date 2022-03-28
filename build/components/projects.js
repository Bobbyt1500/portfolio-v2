var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Projects = function (_React$Component) {
    _inherits(Projects, _React$Component);

    function Projects(props) {
        _classCallCheck(this, Projects);

        var _this = _possibleConstructorReturn(this, (Projects.__proto__ || Object.getPrototypeOf(Projects)).call(this, props));

        _this.state = { numLoaded: 6, selectedFilters: "All" };

        _this.iconSources = {
            "cplusplus": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
            "python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
            "arduino": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
            "react": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
            "js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
            "flask": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
            "digital-ocean": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg",
            "c": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
            "express": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
            "mongodb": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-plain-wordmark.svg",
            "html": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
            "css": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
            "bootstrap": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
            "php": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg",
            "wordpress": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
            "django": "https://static.djangoproject.com/img/logos/django-logo-negative.svg",
            "postgres": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
        };

        _this.whiteIcons = new Set(["flask", "express", "wordpress"]);

        _this.filters = {
            "All": new Set([]),
            "C/C++": new Set(["cplusplus", "c"]),
            "Python": new Set(["python"]),
            "JS/Web": new Set(["js", "flask", "html", "php", "wordpress"]),
            "Engineering": new Set(["engineering", "arduino"])
        };

        _this.loadMore = _this.loadMore.bind(_this);
        _this.filterPressed = _this.filterPressed.bind(_this);
        return _this;
    }

    _createClass(Projects, [{
        key: "loadMore",
        value: function loadMore() {
            this.setState({ numLoaded: this.state.numLoaded + 6 });
        }
    }, {
        key: "filterPressed",
        value: function filterPressed(e) {
            this.setState({ numLoaded: 6, selectedFilters: $(e.target).attr("data-filter") });
        }
    }, {
        key: "getFilters",
        value: function getFilters() {
            var buttons = [];
            for (var key in this.filters) {

                var extraClasses = "";
                if (key == this.state.selectedFilters) {
                    extraClasses = " btn-filter-active";
                }

                buttons.push(React.createElement(
                    "button",
                    { className: "btn btn-filter btn-custom-outline" + extraClasses, onClick: this.filterPressed, "data-filter": key },
                    key
                ));
            }

            return React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                    "div",
                    { className: "col d-flex justify-content-center align-items-center" },
                    React.createElement(
                        "div",
                        { className: "btn-group my-5" },
                        buttons
                    )
                )
            );
        }
    }, {
        key: "getFilteredData",
        value: function getFilteredData() {
            var projectData = this.props.projectData;
            var ret = [];
            var filterCategories = this.filters[this.state.selectedFilters];

            for (var i = 0; i < projectData.length; ++i) {
                var project = projectData[i];

                for (var j = 0; j < project["categories"].length; ++j) {
                    if (filterCategories.size == 0 || filterCategories.has(project["categories"][j])) {
                        ret.push(project);
                        break;
                    }
                }
            }

            return ret;
        }
    }, {
        key: "createCard",
        value: function createCard(project) {
            var _this2 = this;

            // Get Icons
            var icons = [];
            for (var k = 0; k < project["categories"].length; ++k) {
                var category = project["categories"][k];
                // Add Icon
                if (category in this.iconSources) {
                    // Extra classes for styling
                    var extraClasses = this.whiteIcons.has(category) ? " filter-white" : "";
                    icons.push(React.createElement("img", { className: "svg-icon mx-1" + extraClasses, src: this.iconSources[category] }));
                }
            }

            return React.createElement(
                "div",
                { className: "col-lg-4 my-3" },
                React.createElement(
                    "div",
                    { className: "card my-2" },
                    React.createElement("img", { src: "https://user-images.githubusercontent.com/62358060/" + project["img_ids"][0], className: "card-img-top" }),
                    React.createElement(
                        "div",
                        { className: "card-body" },
                        React.createElement(
                            "h5",
                            { className: "card-title" },
                            project["title"]
                        ),
                        React.createElement(
                            "p",
                            { className: "card-text" },
                            project["description"]
                        ),
                        icons
                    ),
                    React.createElement(
                        "div",
                        { className: "card-footer" },
                        React.createElement(
                            "button",
                            { onClick: function onClick() {
                                    return _this2.props.showModal(project);
                                }, className: "btn btn-custom" },
                            "More Info"
                        )
                    )
                )
            );
        }
    }, {
        key: "getCards",
        value: function getCards() {
            var _this3 = this;

            // Create rows of cards
            var projectData = this.getFilteredData();

            if (projectData.length == 0) return [];

            var ret = [];
            var helper = function helper(i, cur) {

                var project = projectData[i];

                cur.push(_this3.createCard(project));

                if (cur.length == 3) {
                    ret.push(React.createElement(
                        "div",
                        { className: "row card-row" },
                        cur
                    ));
                    cur = [];
                }

                if (i + 1 < projectData.length && i + 1 < _this3.state.numLoaded) {
                    helper(i + 1, cur);
                } else {
                    ret.push(React.createElement(
                        "div",
                        { className: "row card-row" },
                        cur
                    ));
                }
            };

            helper(0, []);

            return ret;
        }
    }, {
        key: "render",
        value: function render() {

            return React.createElement(
                "div",
                { id: "projectCards" },
                this.getFilters(),
                this.getCards(),
                this.state.numLoaded < this.getFilteredData().length && React.createElement(
                    "button",
                    { type: "button", className: "btn btn-lg my-5 btn-block btn-custom-outline", id: "seeMore", onClick: this.loadMore },
                    "See More"
                )
            );
        }
    }]);

    return Projects;
}(React.Component);

export default Projects;