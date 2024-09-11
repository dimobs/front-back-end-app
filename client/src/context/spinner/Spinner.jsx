import { useLoading } from './SpinnerContext'
import './spinnerCSS.css'

export default function LoadingSpinner () {
    const { loading } = useLoading();

    return(
        loading && (
            <div className="overlay__spinner">
            <div className="rainbow-loader"></div>
            </div>
        )
    );
}