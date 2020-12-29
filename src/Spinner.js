import React from 'react';
import { Dimmer, Grid, GridColumn, Loader} from 'semantic-ui-react';

// import Loader from 'react-loaders';


// import RiseLoader from '@bit/davidhu2000.react-spinners.rise-loader';



class Spinner extends React.Component {

    render () {
        return (
            <Dimmer>
                <Loader/>
            </Dimmer>
        )
    }
    
}

export default Spinner;