import React from 'react';
import mainLogo from '../assets/MainIcon.png'
import { Link, Links, NavLink } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const Navbar = () => {
	const { userLogout, user, loding } = useAuth();
	const navLinkClass = ({ isActive }) => {
		isActive && 'text-cyan-500 font-medium'
	}

	return (
		<div className="navbar shadow-2xl bg-[#3B82F6] px-0 lg:px-5">
			<div className="flex-1 ">
				<Link className='flex items-center gap-1.5' to={'/'}>
					<img className='w-10' src={mainLogo} alt="" />
					<p className="text-lg lg:text-xl font-bold text-white">QueryNest</p>
				</Link>
			</div>
			<div className="flex-none items-center">
				<ul className="menu menu-horizontal px-1">
					<li className='text-white  hover:text-cyan-200 text-'><NavLink className={({ isActive }) =>
						isActive
							? 'text-amber-300 font-bold'
							: 'text-white hover:text-cyan-200'
					}
						to={'/'}>
						Home
					</NavLink>
					</li> {/*font-medium when select*/}
					<li className='text-white hover:text-cyan-200'><NavLink className={({ isActive }) =>
						isActive
							? 'text-amber-300 font-bold'
							: 'text-white hover:text-cyan-200'
					} to={'/allQueries'}>Queries</NavLink></li>

					{user && (
						<>
							<li className='hidden md:hidden lg:block text-white hover:text-cyan-200'>
								<NavLink
									className={({ isActive }) =>
										isActive
											? 'text-amber-300 font-bold'
											: 'text-white hover:text-cyan-200'
									}
									to="/myQueries"
								>
									My Queries
								</NavLink>
							</li>
							<li className='hidden md:hidden lg:block text-white hover:text-cyan-200'>
								<NavLink
									className={({ isActive }) =>
										isActive
											? 'text-amber-300 font-bold'
											: 'text-white hover:text-cyan-200'
									}
									to="/recommendationsForMe"
								>
									Recommendations For Me
								</NavLink>
							</li>
							<li className='hidden md:hidden lg:block text-white hover:text-cyan-200'>
								<NavLink
									className={({ isActive }) =>
										isActive
											? 'text-amber-300 font-bold'
											: 'text-white hover:text-cyan-200'
									}
									to="/myRecommendations"
								>
									My recommendations
								</NavLink>
							</li>
						</>
					)}


					{
						user ?
							<div className="dropdown dropdown-end">
								<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ml-2">
									<div className="w-10 rounded-full border-2 border-green-600">
										<img
											referrerPolicy='no-referrer'
											alt="Tailwind CSS Navbar component"
											src={user?.photoURL} />
									</div>
								</div>

								<ul
									tabIndex={0}
									className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
									<li className='block md:block lg:hidden text-[#1F2937]'><NavLink className={({ isActive }) => isActive ? 'bg-amber-300':undefined} to={'/myQueries'}>My Queries</NavLink></li>

									<li className='block md:block lg:hidden text-[#1F2937]'><NavLink className={({ isActive }) => isActive ? 'bg-amber-300':undefined} to={'/recommendationsForMe'}>Recommendations For Me</NavLink></li>

									<li className='block md:block lg:hidden text-[#1F2937]'><NavLink className={({ isActive }) => isActive ? 'bg-amber-300':undefined} to={'/myRecommendations'}>My recommendations</NavLink></li>
									<li onClick={() => userLogout()} className="btn btn-sm rounded-lg mt-4 bg-red-500 text-white">Log Out</li>
								</ul>
							</div>
							:
							<div className='ml-2'>
								<li><Link className='btn text-blue-600 hover:bg-gray-300 hover:text-black' to={'/signIn'}>Signin</Link></li>
							</div>
					}

				</ul>
			</div>
		</div>
	);
};

export default Navbar;