var React = require('react');
var TextInput = require('./common/TextInput')
var Link = require('react-router').Link;
var browserHistory = require("react-router").browserHistory
var UserActionCreator = require("../actions/UserActionCreator")
var UserStore = require("../stores/userStore")

var SignUp = React.createClass({
	getInitialState: function () {
		return {
			errors: {},
			text: {
				fname: '',
				lname: '',
				email: '',
				password: '',
			}
		}
	},
	componentWillMount: function () {
		UserStore.addChangeListener(this.onChange);
	},

	componentWillUnmount: function () {
		UserStore.removeChangeListener(this.onChange);
	},

	onChange: function () {
		console.log(UserStore.getError())
		if (UserStore.getError() == "") {
			browserHistory.push("/FinancePlan");
		} else {
			if (this.state.text.password == "") {
				console.log("hi")
				this.setState({
					errors: {
						email: "This email has already been used",
						password: "This field should not be blank"
					}
			})
		} else {
			console.log("two")
				this.setState({
					errors: {
						email: "This email has already been used"
					}
				})
			}
		}
	},
	setError: function (emailerror, password) {

		if (!password) {
			password = "This field should not be blank"
		}
		this.setState({
			errors: {
				email: emailerror,
				password: password
			}
		})
	},
	saveTodoState: function (event) {
		var field = event.target.name;
		var value = event.target.value;
		var newText = Object.assign({}, this.state.text);

		newText[field] = value;

		this.setState({
			text: newText
		})
	},
	link: function () {
		browserHistory.push("/signup")
	},
	showEnd: function () {
		if (this.state.text.password == "" && this.state.text.email == "") {
			console.log("hi")
			this.setError("This field should not be blank", false)
		}
		else if (this.state.text.email == "") {
			this.setError("This field should not be blank", true)
		}
		else if (this.state.text.password == "") {
			this.setError("", false)
		}
		else {
			UserActionCreator.removeError()
			UserActionCreator.createUser(this.state.text.email, this.state.text.password, this.state.text.fname + this.state.text.lname, true)
		}
	},
	render: function () {
		return (
			<div>
				<div className="imgContainer"><img className="image" src="../images/moneylogo.png" alt="logo" /></div>
				<div className="signupInputContainer">
					<TextInput
						className="signUpInput"
						name="fname"
						placeholder="First Name"
						value={this.state.text.fname}
						onChange={this.saveTodoState}
						error={this.state.errors.fname}
					/>
					<TextInput
						className="signUpInput"
						name="lname"
						placeholder="Last Name"
						value={this.state.text.lname}
						onChange={this.saveTodoState}
						error={this.state.errors.lname}
					/>
					<TextInput
						className="signUpInput"
						name="email"
						placeholder="Email"
						value={this.state.text.email}
						onChange={this.saveTodoState}
						error={this.state.errors.email}
					/>
					<TextInput
						type = "password"
							className="signUpInput"
							name="password"
							placeholder="Password"
							value={this.state.text.password}
							onChange={this.saveTodoState}
							error={this.state.errors.password}
						/>
					<hr />
					<div className="divButton"><button className="btn btn-success" onClick={this.showEnd} >Continue</button></div>
				</div>
			</div>
		)
	}
})

module.exports = SignUp;
