var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Modal = function (_React$Component) {
    _inherits(Modal, _React$Component);

    function Modal(props) {
        _classCallCheck(this, Modal);

        var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

        _this.getCarouselInner = _this.getCarouselInner.bind(_this);
        _this.getBody = _this.getBody.bind(_this);
        _this.getContent = _this.getContent.bind(_this);
        return _this;
    }

    _createClass(Modal, [{
        key: "getContent",
        value: function getContent() {
            var modalData = this.props.modalData;

            if (jQuery.isEmptyObject(modalData)) return React.createElement("div", { className: "modal-content" });

            var carouselButtons = [React.createElement(
                "a",
                { "class": "btn btn-carousel carousel-left", onClick: function onClick() {
                        return $("#modalCarousel").carousel('prev');
                    }, role: "button", "data-slide": "prev" },
                React.createElement("i", { "class": "fas fa-chevron-left fa-2x m-1" })
            ), React.createElement(
                "a",
                { "class": "btn btn-carousel carousel-right", onClick: function onClick() {
                        return $("#modalCarousel").carousel('next');
                    }, role: "button", "data-slide": "next" },
                React.createElement("i", { "class": "fas fa-chevron-right fa-2x m-1" })
            )];

            return React.createElement(
                "div",
                { className: "modal-content" },
                React.createElement(
                    "div",
                    { className: "carousel slide", id: "modalCarousel", "data-interval": "false" },
                    this.getCarouselInner(),
                    modalData.img_ids.length > 1 && carouselButtons
                ),
                React.createElement(
                    "div",
                    { "class": "modal-header" },
                    React.createElement(
                        "div",
                        { className: "col-10" },
                        React.createElement(
                            "h4",
                            { className: "modal-title mb-1" },
                            modalData.title
                        ),
                        modalData.source != "" && React.createElement(
                            "button",
                            { className: "btn btn-custom", onClick: function onClick() {
                                    window.location = "https://github.com/Bobbyt1500/" + modalData.source;
                                } },
                            React.createElement("i", { "class": "devicon-github-original colored" }),
                            "  View Source"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-2 d-flex justify-content-end" },
                        React.createElement(
                            "button",
                            { type: "button", className: "close btn btn-custom", "data-dismiss": "modal", "aria-label": "Close", onClick: function onClick() {
                                    return $("#modal").modal('hide');
                                } },
                            React.createElement("i", { "class": "fas fa-times" })
                        )
                    )
                ),
                this.getBody()
            );
        }
    }, {
        key: "getCarouselInner",
        value: function getCarouselInner() {

            var carouselItems = [];
            for (var i = 0; i < this.props.modalData.img_ids.length; ++i) {
                carouselItems.push(React.createElement(
                    "div",
                    { className: i == 0 ? "carousel-item active" : "carousel-item" },
                    React.createElement("img", { "class": "d-block w-100 modal-carousel-image", src: "https://user-images.githubusercontent.com/62358060/" + this.props.modalData.img_ids[i] })
                ));
            }

            return React.createElement(
                "div",
                { className: "carousel-inner" },
                carouselItems
            );
        }
    }, {
        key: "getBody",
        value: function getBody() {
            var sections = this.props.modalData.sections;
            var text = [];
            for (var i = 0; i < sections.length; ++i) {
                text.push(React.createElement(
                    "h4",
                    null,
                    sections[i][0]
                ));
                text.push(React.createElement(
                    "p",
                    null,
                    sections[i][1]
                ));
            }

            return React.createElement(
                "div",
                { "class": "modal-body" },
                text
            );
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "modal fade", id: "modal", tabindex: "-1", role: "dialog" },
                React.createElement(
                    "div",
                    { className: "modal-dialog", role: "document" },
                    this.getContent()
                )
            );
        }
    }]);

    return Modal;
}(React.Component);

export default Modal;