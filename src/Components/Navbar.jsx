import React from 'react';
import mainLogo from '../assets/MainIcon.png'
import { Link, Links } from 'react-router-dom';

const Navbar = () => {



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
					<li className='text-white  hover:text-cyan-200 text-'><a>Home</a></li> {/*font-medium when select*/}
					<li className='text-white hover:text-cyan-200'><a>Queries</a></li>

					<li className='hidden md:hidden lg:block text-white hover:text-cyan-200'><a>Recommendations For Me</a></li>
					<li className='hidden md:hidden lg:block text-white hover:text-cyan-200'><a>My Queries</a></li>
					<li className='hidden md:hidden lg:block text-white hover:text-cyan-200'><a>My recommendations</a></li>
					{/* <div className="dropdown dropdown-end">
						<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ml-2">
							<div className="w-10 rounded-full">
								<img
									alt="Tailwind CSS Navbar component"
									src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
							</div>
						</div>
						
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
							<li className='block md:block lg:hidden text-[#1F2937]'><a>Recommendations For Me</a></li>
							<li className='block md:block lg:hidden text-[#1F2937]'><a>My Queries</a></li>
							<li className='block md:block lg:hidden text-[#1F2937]'><a>My recommendations</a></li>
							<button className="btn btn-sm bg-[#E8E9EB] rounded-l-lg mt-4 text-[#1F2937]">Log Out</button>
						</ul>
					</div> */}
					<div>
						<li><Link className='btn text-blue-600 hover:bg-gray-300 hover:text-black' to={'/signIn'}>Signin</Link></li>
					</div>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;