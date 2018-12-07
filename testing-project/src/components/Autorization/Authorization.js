import React, {Component} from 'react';
import AutorizationCompany from "./AutorizationCompany";
import '../../App.css';
import {Redirect} from "react-router";
import {firebase} from '../../firebase/firebase';


class Authorization extends Component {


    state = {
        name: "uiscdbsacd"

    };

    componentDidMount() {
        this.mounted = true;
        firebase.database().ref('companies/qnUuRBUn2LeTx083lturGIqB6nj1').on('value', (snapshot) => {
            if (this.mounted) {
                this.setState({name: snapshot.val().name})
            }

        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return (
            <div>
                {this.props.user ? <Redirect to={`/${this.props.user.name}/profile`}/> :
                    <div>
                        <AutorizationCompany/>
                    </div>

                }
            </div>
        );
    }
}


export default Authorization;
