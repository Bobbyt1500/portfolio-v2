export default class Projects extends React.Component {
    constructor(props) {
        super(props)

        this.state = {numLoaded: 6, selectedFilters: "All"}

        this.iconSources = {
            "cplusplus" : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
            "python" : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
            "arduino" : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
            "react" : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
            "js" : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
            "flask" : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
            "digital-ocean" : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg",
            "c" : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
            "express" : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
            "mongodb" : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-plain-wordmark.svg",
            "html" : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
            "css" : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
            "bootstrap" : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
            "php" : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg",
            "wordpress" : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg"
        }

        this.whiteIcons = new Set(["flask", "express", "wordpress"])  

        this.filters = {
            "All" : new Set([]),
            "C/C++" : new Set(["cplusplus", "c"]),
            "Python" : new Set(["python"]),
            "JS/Web" : new Set(["js", "flask", "html", "php", "wordpress"]),
            "Engineering" : new Set(["engineering", "arduino"])
        }

        this.loadMore = this.loadMore.bind(this)
        this.filterPressed = this.filterPressed.bind(this)
    }

    loadMore() {
        this.setState({numLoaded : this.state.numLoaded + 6})
    }

    filterPressed(e) {
       this.setState({selectedFilters: $(e.target).attr("data-filter")})
    }

    getFilters() {
        let buttons = []
        for (var key in this.filters) {

            let extraClasses = ""
            if (key == this.state.selectedFilters) {
                extraClasses = " btn-filter-active"
            }

            buttons.push(
                <button className={"btn btn-filter btn-custom-outline" + extraClasses} onClick={this.filterPressed} data-filter={key}>
                    {key}
                </button>               
            )
        }

        return (
            <div className="row">
                <div className="col d-flex justify-content-center align-items-center">
                    <div className="btn-group my-5">
                        {buttons}
                    </div>
                </div>
            </div>
        )
    }

    getFilteredData() {
        let projectData = this.props.projectData
        let ret = []
        let filterCategories = this.filters[this.state.selectedFilters]

        for (var i = 0; i < projectData.length; ++i) {
            let project = projectData[i]

            for (var j = 0; j < project["categories"].length; ++j) {
                if (filterCategories.size == 0 || filterCategories.has(project["categories"][j])) {
                    ret.push(project)
                    break;
                }
            }
        }

        return ret
    }
    
    createCard(project) {

        // Get Icons
        let icons = []
        for (let k = 0; k < project["categories"].length; ++k) {
            let category = project["categories"][k]
            // Add Icon
            if (category in this.iconSources) {
                // Extra classes for styling
                let extraClasses = this.whiteIcons.has(category) ? " filter-white" : ""
                icons.push(<img className={"svg-icon mx-1" + extraClasses} src={this.iconSources[category]} />)
            }
        }

        return (
            <div className="col-lg-4 my-3">
                <div className="card my-2">
                    <img src={"https://user-images.githubusercontent.com/62358060/" + project["img_ids"][0]} className="card-img-top" />
                    
                    <div className="card-body">
                        <h5 className="card-title">{project["title"]}</h5>
                        <p className="card-text">{project["description"]}</p>
                        {icons}
                    </div>

                    <div className="card-footer">
                        <button onClick={() => this.props.showModal(project)} className="btn btn-custom">More Info</button>
                    </div>

                </div>
            </div>
        )


    }

    getCards() {
        
        // Create rows of cards
        let projectData = this.getFilteredData()

        if (projectData.length == 0) return [];

        let ret = []
        let helper = (i, cur) => {

            let project = projectData[i]

            cur.push(this.createCard(project))

            if (cur.length == 3) {
                ret.push(<div className="row card-row">{cur}</div>)
                cur = []
            }

            if (i + 1 < projectData.length && i + 1 < this.state.numLoaded) {
                helper(i+1, cur)
            } else {
                ret.push(<div className="row card-row">{cur}</div>)
            }
        }

        helper(0, [])

        return ret;

    }

    render() {
       
        return (
            <div id="projectCards">
                {this.getFilters()}

                {this.getCards()}
                
                {this.state.numLoaded < this.getFilteredData().length && <button type="button" className="btn btn-lg my-5 btn-block btn-custom-outline" id="seeMore" onClick={this.loadMore}>See More</button>}
                
            </div>
        );
    }
}