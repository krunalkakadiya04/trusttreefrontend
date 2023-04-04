import React from "react";
import overallRating from "../../assets/images/overallRating.svg";
import trustreeRatings from "../../assets/images/trustreeRatings.svg";
import googleRatings from "../../assets/images/googleRatings.svg";
import redeemedVouchers from "../../assets/images/redeemedVouchers.svg";
import performanceGraph from "../../assets/images/performanceGraph.jpg";
import ratingGraph from "../../assets/images/ratingGraph.jpg";
import starOne from "../../assets/images/starOne.svg";
import feedbackGraph from "../../assets/images/feedbackGraph.jpg";
import staffProfile from "../../assets/images/staffProfile.svg";
import "./Dashbord.css";

const MainMenu = () => {
  return (
    <>
      <div className="contentWrap">
        <div className="FilterBox">
          <ul>
            <li>
              <div className="customSelect">
                <select className="selectpicker ">
                  <option>Branch</option>
                  <option>Branch 01</option>
                  <option>Branch 02</option>
                  <option>Branch 03</option>
                  <option>Branch 04</option>
                </select>
              </div>
            </li>
            <li>
              <div className="customSelect">
                <select className="selectpicker">
                  <option>Experience Type</option>
                  <option>Experience Type 01</option>
                  <option>Experience Type 02</option>
                  <option>Experience Type 03</option>
                  <option>Experience Type 04</option>
                </select>
              </div>
            </li>
            <li>
              <div className="customSelect">
                <select className="selectpicker">
                  <option>Rating</option>
                  <option>Rating 01</option>
                  <option>Rating 02</option>
                  <option>Rating 03</option>
                  <option>Rating 04</option>
                </select>
              </div>
            </li>
            <li>
              <div className="customSelect">
                <select className="selectpicker">
                  <option>Category</option>
                  <option>Category 01</option>
                  <option>Category 02</option>
                  <option>Category 03</option>
                  <option>Category 04</option>
                </select>
              </div>
            </li>
            <li>
              <div className="customSelect">
                <select className="selectpicker">
                  <option>Staff</option>
                  <option>Staff 01</option>
                  <option>Staff 02</option>
                  <option>Staff 03</option>
                  <option>Staff 04</option>
                </select>
              </div>
            </li>
            <li>
              <div className="datepicker datepIcon">
                <input
                  type="text"
                  className="form-control"
                  defaultValue="Date"
                />
              </div>
            </li>
          </ul>
        </div>
        <div className="multiBoxes">
          <ul>
            <li>
              <div className="multiBoxesDiv">
                <span>
                  <img src={overallRating} alt="overall rating" />
                </span>
                <h3>Overall Rating</h3>
                <p>4.8</p>
              </div>
            </li>
            <li>
              <div className="multiBoxesDiv">
                <span>
                  <img src={trustreeRatings} alt="trustree rating" />
                </span>
                <h3>Trustree Ratings</h3>
                <p>1258</p>
              </div>
            </li>
            <li>
              <div className="multiBoxesDiv">
                <span>
                  <img src={googleRatings} alt="google ratings" />
                </span>
                <h3>Google Ratings</h3>
                <p>112</p>
              </div>
            </li>
            <li>
              <div className="multiBoxesDiv">
                <span>
                  <img src={redeemedVouchers} alt="redeemed vouchers" />
                </span>
                <h3>Redeemed Vouchers</h3>
                <p>85</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="box">
          <h2>
            <strong>Performance over time</strong>
          </h2>
          <div className="PerformanceGraph">
            <img
              src={performanceGraph}
              style={{ width: "100%" }}
              alt="performance graph"
            />
          </div>
        </div>
        <div className="row equalHeight">
          <div className="col-md-6">
            <div className="box">
              <h2>
                <strong>Overall rating</strong>
              </h2>
              <div className="OverallGraph">
                <img src={ratingGraph} alt="rating graph" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="box">
              <h2>
                <strong>Branches Comparison</strong>
              </h2>
              <div className="PerformanceGraph">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="width160">
                        Branch <em />
                      </th>
                      <th>
                        Rating <em />
                      </th>
                      <th>
                        Ratings <em />
                      </th>
                      <th>
                        Best Category <em />
                      </th>
                      <th>
                        Low Category <em />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="width160">
                        <p>The 5th SettlementBrSettlementBr</p>
                      </td>
                      <td>
                        4.8
                        <em>
                          <img src={starOne} alt="star One" />
                        </em>
                      </td>
                      <td>450</td>
                      <td>Service</td>
                      <td>Value</td>
                    </tr>
                    <tr>
                      <td className="width160">
                        <p>Heliopolis Branch</p>
                      </td>
                      <td>
                        4.8
                        <em>
                          <img src={starOne} alt="star one" />
                        </em>
                      </td>
                      <td>603</td>
                      <td>Food &amp; Drink</td>
                      <td>Service</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="row equalHeight">
          <div className="col-md-6">
            <div className="box">
              <h2>
                <strong>Categories Rating</strong> <span>(Dine in)</span>
              </h2>
              <div className="categoriesRatingBox">
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        Category <em />
                      </th>
                      <th>
                        Rating <em />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="justify-content-start">
                        <div className="d-flex align-items-center">
                          <em className="YellowBGBox" />

                          <span>Food &amp; Drink</span>
                        </div>
                      </td>
                      <td>
                        4.8
                        <span className="Ratting">
                          <span style={{ width: 4 }} />
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="justify-content-start">
                        <div className="d-flex align-items-center">
                          <em className="BlueBGBox" /> <span>Service</span>
                        </div>
                      </td>
                      <td>
                        4.5
                        <span className="Ratting">
                          <span style={{ width: 8 }} />
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="justify-content-start">
                        <div className="d-flex align-items-center">
                          <em className="GreenBGBox" /> <span>Value</span>
                        </div>
                      </td>
                      <td>
                        4.2
                        <span className="Ratting">
                          <span style={{ width: 9 }} />
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="justify-content-start">
                        <div className="d-flex align-items-center">
                          <em className="PurpleBGBox" />

                          <span>Atmosphere</span>
                        </div>
                      </td>
                      <td>
                        4.0
                        <span className="Ratting">
                          <span style={{ width: 13 }} />
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="box">
              <h2>
                <strong>Staff Rating</strong> <span>(Dine in)</span>
              </h2>
              <div className="categoriesRatingBox">
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        Name <em />
                      </th>
                      <th>
                        Branch <em />
                      </th>
                      <th>
                        Rating <em />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="staffProfile">
                          <span>
                            <img src={staffProfile} alt="profile of staff" />
                          </span>
                          <p>Ahmed Ali Sayed</p>
                        </div>
                      </td>
                      <td>
                        <p>The 5th Settlement Branch</p>
                      </td>
                      <td>
                        4.8
                        <span className="Ratting">
                          <span style={{ width: 4 }} />
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="staffProfile">
                          <span>
                            <img src={staffProfile} alt="profile of staff" />
                          </span>
                          <p>Ahmed Ali Sayed</p>
                        </div>
                      </td>
                      <td>
                        <p>Heliopolis Branch</p>
                      </td>
                      <td>
                        4.5
                        <span className="Ratting">
                          <span style={{ width: 6 }} />
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="staffProfile">
                          <span>
                            <img src={staffProfile} alt="profile of staff" />
                          </span>
                          <p>Ahmed Ali Sayed</p>
                        </div>
                      </td>
                      <td>
                        <p>Heliopolis Branch</p>
                      </td>
                      <td>
                        4.2
                        <span className="Ratting">
                          <span style={{ width: 10 }} />
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="staffProfile">
                          <span>
                            <img src={staffProfile} alt="profile of staff" />
                          </span>
                          <p>Ahmed Ali Sayed</p>
                        </div>
                      </td>
                      <td>
                        <p>Heliopolis Branch</p>
                      </td>
                      <td>
                        4.0
                        <span className="Ratting">
                          <span style={{ width: 13 }} />
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="row equalHeight">
          <div className="col-md-6">
            <div className="box">
              <h2>
                <strong>Customer Suggestions for Categories</strong>
                <span>(Dine in)</span>
              </h2>
              <div
                className="customerSuggestions content mCustomScrollbar scrollbar"
                data-mcs-theme="dark"
              >
                <ul className="SuggestionsUL">
                  <li>
                    <div className="SuggestionsBox">
                      <span className="labelBox labelBoxPurple">Value</span>
                      <p>
                        <strong>6 October : </strong> Improve the ingredients
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="SuggestionsBox">
                      <span className="labelBox labelBoxBlue">Service</span>
                      <p>
                        <strong>6 October:</strong> Need a quieter area but
                        everything is great keep it up and please keep the same
                        quality
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="SuggestionsBox">
                      <span className="labelBox labelBoxYellow">
                        Food &amp; Drink
                      </span>
                      <p>
                        <strong>6 October:</strong> the food was so oily
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="SuggestionsBox">
                      <span className="labelBox labelBoxPurple">Value</span>
                      <p>
                        <strong>6 October : </strong> Improve the ingredients
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="SuggestionsBox">
                      <span className="labelBox labelBoxBlue">Service</span>
                      <p>
                        <strong>6 October:</strong> Need a quieter area but
                        everything is great keep it up and please keep the same
                        quality
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="SuggestionsBox">
                      <span className="labelBox labelBoxYellow">
                        Food &amp; Drink
                      </span>
                      <p>
                        <strong>6 October:</strong> the food was so oily
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="SuggestionsBox">
                      <span className="labelBox labelBoxPurple">Value</span>
                      <p>
                        <strong>6 October : </strong> Improve the ingredients
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="SuggestionsBox">
                      <span className="labelBox labelBoxBlue">Service</span>
                      <p>
                        <strong>6 October:</strong> Need a quieter area but
                        everything is great keep it up and please keep the same
                        quality
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="SuggestionsBox">
                      <span className="labelBox labelBoxYellow">
                        Food &amp; Drink
                      </span>
                      <p>
                        <strong>6 October:</strong> the food was so oily
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="box">
              <h2>
                <strong>Customer Suggestions for Categories</strong>

                <span>(Dine in)</span>
              </h2>
              <div className="customerSuggestions content mCustomScrollbar scrollbar">
                <ul className="SuggestionsUL">
                  <li>
                    <div className="SuggestionsBox">
                      <span className="labelBox labelBoxPurple">Value</span>
                      <p>
                        <strong>6 October : </strong> Improve the ingredients
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="SuggestionsBox">
                      <span className="labelBox labelBoxBlue">Service</span>
                      <p>
                        <strong>6 October:</strong> Need a quieter area but
                        everything is great keep it up and please keep the same
                        quality
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="SuggestionsBox">
                      <span className="labelBox labelBoxYellow">
                        Food &amp; Drink
                      </span>
                      <p>
                        <strong>6 October:</strong> the food was so oily
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="SuggestionsBox">
                      <span className="labelBox labelBoxPurple">Value</span>
                      <p>
                        <strong>6 October : </strong> Improve the ingredients
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="SuggestionsBox">
                      <span className="labelBox labelBoxBlue">Service</span>
                      <p>
                        <strong>6 October:</strong> Need a quieter area but
                        everything is great keep it up and please keep the same
                        quality
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="SuggestionsBox">
                      <span className="labelBox labelBoxYellow">
                        Food &amp; Drink
                      </span>
                      <p>
                        <strong>6 October:</strong> the food was so oily
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="SuggestionsBox">
                      <span className="labelBox labelBoxPurple">Value</span>
                      <p>
                        <strong>6 October : </strong> Improve the ingredients
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="SuggestionsBox">
                      <span className="labelBox labelBoxBlue">Service</span>
                      <p>
                        <strong>6 October:</strong> Need a quieter area but
                        everything is great keep it up and please keep the same
                        quality
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="SuggestionsBox">
                      <span className="labelBox labelBoxYellow">
                        Food &amp; Drink
                      </span>
                      <p>
                        <strong>6 October:</strong> the food was so oily
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row equalHeight">
          <div className="col-md-6">
            <div className="box">
              <h2>
                <strong>How did you hear about us?</strong>

                <span>(Dine in)</span>
              </h2>
              <div className="hearAbout">
                <img src={feedbackGraph} alt="feedback graph" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="box">
              <h2>
                <strong>Customer Suggestions for Categories</strong>

                <span>(Dine in)</span>
              </h2>
              <div className="customerSuggestions content mCustomScrollbar scrollbar">
                <ul className="SuggestionsUL">
                  <li>
                    <div className="SuggestionsBox">
                      <span className="labelBox labelBoxPurple">Value</span>
                      <p>
                        <strong>6 October : </strong> Improve the ingredients
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="SuggestionsBox">
                      <p>
                        <strong>6 October:</strong> the food was so oily
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="SuggestionsBox">
                      <p>
                        <strong>6 October : </strong> Improve the ingredients
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="SuggestionsBox">
                      <p>
                        <strong>6 October:</strong> Need a quieter area but
                        everything is great keep it up and please keep the same
                        quality
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="SuggestionsBox">
                      <p>
                        <strong>6 October:</strong> the food was so oily
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="SuggestionsBox">
                      <p>
                        <strong>6 October : </strong> Improve the ingredients
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="SuggestionsBox">
                      <p>
                        <strong>6 October:</strong> Need a quieter area but
                        everything is great keep it up and please keep the same
                        quality
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="SuggestionsBox">
                      <p>
                        <strong>6 October:</strong> the food was so oily
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainMenu;
