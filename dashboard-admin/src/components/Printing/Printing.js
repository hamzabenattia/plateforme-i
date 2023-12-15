import React from 'react'
import { useDispatch } from 'react-redux';

function Printing(props) {

  const { user } = props;
  const dispatch = useDispatch();



  return (
    <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
    <div class="col">
							<div class="card card-user shadow-sm">
								<div class="card-header">
									<img class="img-md img-avatar" src={user.avatar} alt="User pic"/>
								</div>
								<div class="card-body">
									<h5 class="card-title mt-5">{user.socite}</h5>
									<div class="card-text text-muted">
										<p class="m-0">TVA: {user.tva}</p>
										<p>{user.email}</p>
										<a class="btn btn-light" href={`printing/${user._id}`}>Voir le profil</a>
									</div>
								</div>
							</div>
						</div>
    </div>

    
  )
}

export default Printing