import React from "react";
import "./Profile.css";

function ProfileCard() {
	return (
		<div className="card-container">
			<header>
				<img className="profileImg" src="https://www.w3schools.com/images/w3schools_green.jpg" />
			</header>
			<h1 className="bold-text">User-Name22</h1>
			<div className="social-container">
				<div className="followers">
					<h1 className="bold-text">20</h1>
					<h2 className="smaller-text">Friends</h2>
				</div>
				<div className="likes">
					<h1 className="bold-text">15</h1>
					<h2 className="smaller-text">Reviews</h2>
				</div>
				<div className="photos">
					<h1 className="bold-text">100</h1>
					<h2 className="smaller-text">Comments</h2>
				</div>
			</div>
		</div>
	);
}

export default ProfileCard;