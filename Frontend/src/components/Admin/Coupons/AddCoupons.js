import React,{useState,useEffect} from 'react'

function AddCoupons() {
    const[coupon,setCoupon] = useState({
        couponCode:'',
        discountPercentage:'',
        validFrom:'',
        validTo:'',
        status:'',
        validFor:'',
    });
    const [customers,setCustomers] = useState();
    useEffect(()=>{
        fetchCustomers();
    },[]);

    const fetchCoupons = async()=>{
        try{
            const response = fetch(`http://localhost:5000/customers/`,{
                method:'GET',
            });
            const data = await response.json();
            setCustomers(data);
            if(response.ok){
                console.log('successfully fetched customers data');
            }
        }catch(err){
            console.log(err);
        }
    }

    const handleChange = (e)=>{
        const { name, value, files,type,checked } = e.target;
        setCoupon({ ...userData, [name]: value });
    }

    const handleSubmit = async()=>{

    }

  return (
    <>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card shadow">
                <div className="card-body">
                  <h2 className="card-title text-center mb-4">Add Coupon</h2>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Coupon Code</label>
                        <input
                          type="text"
                          className="form-control"
                          id="couponCode"
                          name="couponCode"
                          value={coupon.couponCode}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="phone_no" className="form-label">Discount Percentage</label>
                        <input
                          type="tel"
                          className="form-control"
                          id="discountPercentage"
                          name="discountPercentage"
                          value={coupon.discountPercentage}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="dob" className="form-label">Valid From</label>
                        <input
                          type="date"
                          className="form-control"
                          id="validFrom"
                          name="validFrom"
                          value={coupon.validFrom}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="dob" className="form-label">Valid To</label>
                        <input
                          type="date"
                          className="form-control"
                          id="validTo"
                          name="validTo"
                          value={coupon.validTo}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="dob" className="form-label">Valid For</label>
                        <select name='validFor' id='validFor' className='form-control' onChange={handleChange} required>
                            
                        </select>
                      </div>
                    </div>
                    <div className="d-grid gap-2 mt-4">
                      <button type="submit" className="btn btn-primary btn-lg">Update Profile</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default AddCoupons
