import Main from './Main'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../redux/actions'

const mapStateToProps = (state) => {
    return{
        posts: state.posts,
        loading: state.loading,
        errorInfo: state.errorInfo
    } 
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch)
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main)

export default App