export default class Modal extends React.Component {
    constructor(props) {
        super(props)

        this.getCarouselInner = this.getCarouselInner.bind(this)
        this.getBody = this.getBody.bind(this)
        this.getContent = this.getContent.bind(this)
    }

    getContent() {
        let modalData = this.props.modalData

        if (jQuery.isEmptyObject(modalData)) return (<div className="modal-content"/>)

        let carouselButtons = [(
        <a class="btn btn-carousel carousel-left" onClick={() => $("#modalCarousel").carousel('prev')} role="button" data-slide="prev">
            <i class="fas fa-chevron-left fa-2x m-1"></i>
        </a>
        ), (
        <a class="btn btn-carousel carousel-right" onClick={() => $("#modalCarousel").carousel('next')} role="button" data-slide="next">
            <i class="fas fa-chevron-right fa-2x m-1"></i>
        </a>
        )]

        return (
            <div className="modal-content">

                <div className="carousel slide" id="modalCarousel" data-interval="false">
                    
                    {this.getCarouselInner()}

                    {modalData.img_ids.length > 1 && carouselButtons}

                </div>
                
                <div class="modal-header">

                    <div className="col-10">
                        <h4 className="modal-title mb-1">{modalData.title}</h4>
                        {( modalData.source != "" &&
                            <button className="btn btn-custom" onClick={() => {window.location = "https://github.com/Bobbyt1500/" + modalData.source}}>
                                <i class="devicon-github-original colored"></i>  View Source
                            </button>
                        )}
                        {( modalData.link != null &&
                            <button className="btn btn-custom" onClick={() => {window.location = modalData.link}}>
                                View
                            </button>
                        )}
                        
                    </div>

                    <div className="col-2 d-flex justify-content-end">
                        <button type="button" className="close btn btn-custom" data-dismiss="modal" aria-label="Close" onClick={() => $("#modal").modal('hide')}>
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                    
                {this.getBody()}
            </div>)
    }

    getCarouselInner() {

        let carouselItems = []
        for (let i = 0; i < this.props.modalData.img_ids.length; ++i) {
            carouselItems.push(
                <div className={i == 0 ? "carousel-item active" : "carousel-item"}>
                    <img class="d-block w-100 modal-carousel-image" src={"https://user-images.githubusercontent.com/62358060/" + this.props.modalData.img_ids[i]} />
                </div>
            )
        }

        return (
            <div className="carousel-inner">
                {carouselItems}
            </div>
        )
    }

    getBody() {
        let sections = this.props.modalData.sections
        let text = []
        for (let i = 0; i < sections.length; ++i) {
            text.push(<h4>{sections[i][0]}</h4>)
            text.push(<p>{sections[i][1]}</p>)
        }

        return (
            <div class="modal-body">
                {text}
            </div>
        )
    }

    render() {
        return(
            <div className="modal fade" id="modal" tabindex="-1" role="dialog">
                <div className="modal-dialog" role="document">

                    {this.getContent()}
                    
                </div>
            </div>
        )
    }
}