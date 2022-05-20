import react, { Component } from "react";
import { Link } from "react-router-dom";
export default class Error404 extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="text-center mt-5">
                    <p className="text-dark mb-5 lead alert alert-danger">
                        404 Page Not Found
                    </p>
                    <p className="text-black-50 mb-0">
                        It looks like you found a glitch in the matrix...
                    </p>
                    <Link to="/dashboard" className="alert-danger">
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }
}
