function hashCode(str) {
    let hash = 0;
    if (str.length == 0) return hash;
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};

const Student = (props) => (
    <div style={{position : 'relative',overflow: 'hidden' , borderColor : '#D2691E' , borderWidth : 10 , borderStyle : 'solid', borderRadius : 15, width : '60%', paddingTop : 5}}>
        <picture style={{float: 'left' }}>
            <source srcSet={props.photoLink}/>
            <img src="default.png" style={{width: 100 , height: 100}}/>
        </picture>
        <div  style={{marginLeft : 120 }}>
        <h2> {props.name} </h2>
        <li> {props.description} </li>
        </div>
        <address style={{ position: 'absolute', right: '5%', bottom : '5%'}}> {props.mail} </address>
    </div>
)

const SearchBox = (props) => {
    return (
        <div style={{position : 'relative',overflow: 'hidden' , borderColor : '#D2691E' , borderWidth : 10 , borderStyle : 'solid', borderRadius : 15, width : '99%', paddingTop : 5, paddingBottom : 5}}>
               
        <b style={{color : 'red',float: 'right', textAlign : 'right'}}> {props.warning} </b>
        <input
            type="text"
            name="SearchBox"
            onChange={props.handleSearchBar}
            style={{width : '50%', float : 'left'}}
        />       
        
        </div>

);
}

const AddBox = (props) => {
        return (
            <div style={{position : 'sticky', top: '20%', borderColor : '#D2691E' , borderWidth : 10 , borderStyle : 'solid',
             borderRadius : 15, width : '30%', height : '60vh', float: 'right', textAlign: 'center'}}>
            <br/>
            <br/>
            <h2> Imię </h2>
            <input
                type="text"
                name="NameField"
                value={props.name}
                onChange={props.handleNameImput}
            /> 
            <h2> Opis </h2>
            <input
                type="text"
                name="DescField"
                value={props.description}
                onChange={props.handleDescImput}
            /> 
            <h2> Email </h2>
            <input
                type="text"
                name="MailField"
                value={props.mail}
                onChange={props.handleMailImput}
            />
            <h2> Link do profilówki </h2>
            <input
                type="text"
                name="LinkField"
                value={props.photoLink}
                onChange={props.handleLinkImput}
            />    
            <br/>
            <br/>
            <button 
                type="button"
                name="PushButton"
                onClick={props.handlePush}
            >Dodaj zgłoszenie</button>
            <br/>
            <br/>
            <h2 style={{color : 'red'}}> {props.warning} </h2>

        </div>    
    );
}

class StudentList extends React.Component {

    state = {
        Gathering: [
            {
                name: "Łukasz Piekarek",
                description: "Chce zdać webówkę, nie wie jak",
                mail: "251181@dziekanka.de",
                photoLink: ""
            },
            {
                name: "Adam",
                description: "Lubie długie spacery po crashlogach glasfisha i powtażanie IO, szukam partnera do projektu",
                mail: "adam1@mail.de",
                photoLink: "https://steamuserimages-a.akamaihd.net/ugc/954100375534550224/27B8ED17ADF126F395CCB62D17E6488C86B2B5B8/?imw=268&imh=268&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
            },
            {
                name: "Roman",
                description: "Mam pomysł na apke za milion złotych, jak ktoś chce mi ją napisać to proszę",
                mail: "rekin@biznesu.gov",
                photoLink: "https://a.allegroimg.com/original/11345d/b9d1927249a2ac586ffbfa8beedc/BABY-SHARK-MASKOTKA-PLUSZAK-DADDY-TATA-CUBE-SPIEWA"
            },
            {
                name: "John Niedoktor",
                description: "Elo, szukam dysków z odpowiedziami do kolosów, no nie?",
                mail: "profesor@uczelnia.edu",
                photoLink: "https://www.legalniewsieci.pl/!data/newsy/news_1982.jpg"
            },
            {
                name: "Anonim",
                description: "potrzebuję kolegi do pracy nad projektem z AK2",
                mail: "mail2138@throwaway.com",
                photoLink: "https://avatarfiles.alphacoders.com/161/thumb-161888.png"
            },
            {
                name: "Mateusz",
                description: "proszę niech ktoś mi pomoże wyjść z Vima",
                mail: "mail@mail.pl",
                photoLink: "https://as1.ftcdn.net/jpg/00/64/67/80/1000_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"
            }
            ],
            name: "",
            description: "",
            mail: "",
            photoLink: "",
            warningMsg: "",
            underConstructionMsg: ""
    }
    errorMessage = "Wrong entry value"

    handleNameImput= (event) => {
        this.setState({
           name: event.target.value
        });
    };

    handleDescImput= (event) => {
        this.setState({
            description: event.target.value
        });
    };

    handleMailImput= (event) => {
        this.setState({
            mail: event.target.value
        });
    };

    handleLinkImput= (event) => {
        this.setState({
            photoLink: event.target.value
        });
    };

    handlePush= (event) => {

        if(this.state.name === "" || this.state.description === "" || this.state.mail === "")
        {
            this.setState({
                warningMsg: "Niekompletne infromacje"
            });
        }
        else
        {
            this.setState({
                warningMsg: "",
                Gathering: this.state.Gathering.concat( {
                    name: this.state.name,
                    description: this.state.description,
                    mail: this.state.mail,
                    photoLink: this.state.photoLink
                }),
                name: "",
                mail: "",
                photoLink: "",
                description: "",
                warningMsg: ""
            });

           
        }
    };

    attemptSearch= (event) => {
        this.setState({
            underConstructionMsg: "wyszukiwanie nie działa, zostawiłem pasek ze względów estetycznych"
        });
    };
    render() {
        const myList = this.state.Gathering.map(it => (
            <Student name={it.name} description={it.description} mail={it.mail} photoLink={it.photoLink} key={hashCode(it.name)} />
        ))

        return (
            <>
                <SearchBox
                    handleSearchBar={this.attemptSearch}
                    warning={this.state.underConstructionMsg}
                />

                <AddBox addBox
                    handlePush={this.handlePush}
                    handleDescImput={this.handleDescImput}
                    handleLinkImput={this.handleLinkImput}
                    handleMailImput={this.handleMailImput}
                    handleNameImput={this.handleNameImput}
                    name={this.state.name}
                    description={this.state.description}
                    mail={this.state.mail}
                    photoLink={this.state.photoLink}
                    warning={this.state.warningMsg}
                />

    
                <ul>
                    {myList}
                </ul>
            </>
        );
    }
}

ReactDOM.render(
    <StudentList dummyText="Witaj Dniu" />,
    document.getElementById('root')
);