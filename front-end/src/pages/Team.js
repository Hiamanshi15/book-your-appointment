import React from "react";
import images from '../Assets/img/images (1).jpg'
import download from '../Assets/img/download (1).jpg'
import download2 from '../Assets/img/download (2).jpg'
import download3 from '../Assets/img/download (3).jpg'
import "@fortawesome/fontawesome-free/css/all.min.css";
import { MDBIcon } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "./style.css";

function Team() {
    return (
        <div className="Team">
             <h2>Our Team</h2>
            <div className="image">
                <div className="img">
                <img src={images} alt="DoctorzBook" />
                    <h3>Chaitanya Gupta</h3>
                    <h6>Full stack web Devloper</h6>
                    <a href='' className='me-4 text-reset'>
                                        <MDBIcon color='white' fab icon='linkedin' />
                                    </a>
                                    <a href='' className='me-4 text-reset'>
                                        <MDBIcon color='white' fab icon='instagram' />
                                    </a>                    
                </div>
                <div className="img">
                <img src={download} alt="DoctorzBook" />
                    <h3>Kashish Bhandula</h3>
                    <h6>Lead Devloper</h6>
                    <a href='' className='me-4 text-reset'>
                                        <MDBIcon color='white' fab icon='linkedin' />
                                    </a>
                                    <a href='' className='me-4 text-reset'>
                                        <MDBIcon color='white' fab icon='instagram' />
                                    </a>
                </div>
                <div className="img">
                <img src={download2} alt="DoctorzBook" />
                    <h3>Ashish Bansal</h3>
                    <h6>Lead Devloper</h6>
                    <a href='' className='me-4 text-reset'>
                                        <MDBIcon color='white' fab icon='linkedin' />
                                    </a>
                                    <a href='' className='me-4 text-reset'>
                                        <MDBIcon color='white' fab icon='instagram' />
                                    </a>
                </div>
                <div className="img">
                <img src={download3} alt="DoctorzBook" />
                    <h3>Ankit Jangra</h3>
                    <h6>Lead Devloper</h6>
                    <a href='' className='me-4 text-reset'>
                                        <MDBIcon color='white' fab icon='linkedin' />
                                    </a>
                                    <a href='' className='me-4 text-reset'>
                                        <MDBIcon color='white' fab icon='instagram' />
                                    </a>
                </div>
            </div>
        </div>    
        
    )
}

export default Team;



// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllServiceProviders } from "../redux/serviceProviderSlice";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import { MDBIcon } from 'mdb-react-ui-kit';
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "./style.css";

// function Team() {
//   const dispatch = useDispatch();
//   const { providers, loading } = useSelector((state) => state.serviceProvider);

//   useEffect(() => {
//     dispatch(getAllServiceProviders());
//   }, [dispatch]);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="Team">
//       <h2>Our Service Providers</h2>
//       <div className="image">
//         {providers.map((provider) => (
//           <div className="img" key={provider._id}>
//             <img
//               src={provider.image}
//               alt={provider.serviceName}
//               className="w-full h-40 object-cover mb-2 rounded"
//             />
//             <h3>{provider.user?.name}</h3>
//             <h6>{provider.serviceName}</h6>
//             <a href="#" className="me-4 text-reset">
//               <MDBIcon color="white" fab icon="linkedin" />
//             </a>
//             <a href="#" className="me-4 text-reset">
//               <MDBIcon color="white" fab icon="instagram" />
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Team;
