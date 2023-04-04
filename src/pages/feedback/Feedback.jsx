import React from "react";
import { Form } from "react-bootstrap";
import "./feedback.scss";
import search from "../../assets/images/search.svg";

const Feedback = () => {
  return (
    <>
      <div className="contentWrap">
        <div className="contentHead">
          <h1>Trustree Feedbacks</h1>
          <div className="customSelect ms-auto staticIcon">
            <Form.Select className="selectpicker">
              <option>Chickin Worx</option>
              <option>Chickin 01</option>
              <option>Chickin 02</option>
              <option>Chickin 03</option>
              <option>Chickin 04</option>
            </Form.Select>
          </div>
          <button className="ms-3 btnIconDashBDR">
            <em>
              <img src="images/exportData.svg" alt="" />
            </em>{" "}
            <strong>Export Data</strong>
          </button>
        </div>
        <div className="FilterBox">
          <ul>
            <li>
              <div className="customSelect">
                <select className="selectpicker">
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
                <input type="text" className="form-control" />
              </div>
            </li>
          </ul>
        </div>
        <div className="feedbacksBox">
          <div className="feedbacksLable">
            <ul>
              <li className="active">
                <strong>All</strong> <span>178</span>
              </li>
              <li>
                <strong>Unresolved</strong> <span>128</span>
              </li>
              <li>
                <strong>Resolved</strong> <span>50</span>
              </li>
            </ul>
          </div>
          <div className="feedbackBody">
            <div className="feedbackLeft">
              <div className="feedbackSearch">
                <div className="inputWrap">
                  <button>
                  <img src={search} alt="" />
                  </button>
                  <input
                    type="text"
                    name="search"
                    className="form-control"
                    placeholder="Search by name or phone..."
                  />
                </div>
              </div>
                <div
                  className="feedbackUsers content mCustomScrollbar"
                  data-mcs-theme="dark"
                >
                  <ul className="feedbackUsersUL">
                    <li className="active">
                      <div className="feedbackUsersBox">
                        <div className="feedbackUsersHead">
                          <strong>
                            Mahmoud Mokhtar <em>2</em>
                          </strong>
                          <span className="Unresolved">Unresolved</span>
                        </div>
                        <div className="feedbackUsersFTR">
                          <h3>
                            Last Rating:
                            <strong>4</strong>
                            <em>
                              <img src="images/starOne.svg" alt="" />
                            </em>
                          </h3>
                          <span>6 October 2022</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="feedbackUsersBox">
                        <div className="feedbackUsersHead">
                          <strong>
                            بلال سيف <em>1</em>
                          </strong>
                          <span className="Resolved">Resolved</span>
                        </div>
                        <div className="feedbackUsersFTR">
                          <h3>
                            Last Rating:
                            <strong>4</strong>
                            <em>
                              <img src="images/starOne.svg" alt="" />
                            </em>
                          </h3>
                          <span>6 October 2022</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="feedbackUsersBox">
                        <div className="feedbackUsersHead">
                          <strong>
                            Omar Ahmed Ali<em>3</em>
                          </strong>
                          <span className="Resolved">Resolved</span>
                        </div>
                        <div className="feedbackUsersFTR">
                          <h3>
                            Last Rating:
                            <strong>4</strong>
                            <em>
                              <img src="images/starOne.svg" alt="" />
                            </em>
                          </h3>
                          <span>6 October 2022</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="feedbackUsersBox">
                        <div className="feedbackUsersHead">
                          <strong>
                            Khaled Mohamed<em>4</em>
                          </strong>
                          <span className="Resolved">Resolved</span>
                        </div>
                        <div className="feedbackUsersFTR">
                          <h3>
                            Last Rating:
                            <strong>4</strong>
                            <em>
                              <img src="images/starOne.svg" alt="" />
                            </em>
                          </h3>
                          <span>6 October 2022</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="feedbackUsersBox">
                        <div className="feedbackUsersHead">
                          <strong>
                            محمود مختار<em>1</em>
                          </strong>
                          <span className="Resolved">Resolved</span>
                        </div>
                        <div className="feedbackUsersFTR">
                          <h3>
                            Last Rating:
                            <strong>4</strong>
                            <em>
                              <img src="images/starOne.svg" alt="" />
                            </em>
                          </h3>
                          <span>6 October 2022</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="feedbackUsersBox">
                        <div className="feedbackUsersHead">
                          <strong>
                            Mahmoud Mokhtar <em>2</em>
                          </strong>
                          <span className="Unresolved">Unresolved</span>
                        </div>
                        <div className="feedbackUsersFTR">
                          <h3>
                            Last Rating:
                            <strong>4</strong>
                            <em>
                              <img src="images/starOne.svg" alt="" />
                            </em>
                          </h3>
                          <span>6 October 2022</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="feedbackUsersBox">
                        <div className="feedbackUsersHead">
                          <strong>
                            بلال سيف <em>1</em>
                          </strong>
                          <span className="Resolved">Resolved</span>
                        </div>
                        <div className="feedbackUsersFTR">
                          <h3>
                            Last Rating:
                            <strong>4</strong>
                            <em>
                              <img src="images/starOne.svg" alt="" />
                            </em>
                          </h3>
                          <span>6 October 2022</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="feedbackUsersBox">
                        <div className="feedbackUsersHead">
                          <strong>
                            Omar Ahmed Ali<em>3</em>
                          </strong>
                          <span className="Resolved">Resolved</span>
                        </div>
                        <div className="feedbackUsersFTR">
                          <h3>
                            Last Rating:
                            <strong>4</strong>
                            <em>
                              <img src="images/starOne.svg" alt="" />
                            </em>
                          </h3>
                          <span>6 October 2022</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="feedbackUsersBox">
                        <div className="feedbackUsersHead">
                          <strong>
                            Khaled Mohamed<em>4</em>
                          </strong>
                          <span className="Resolved">Resolved</span>
                        </div>
                        <div className="feedbackUsersFTR">
                          <h3>
                            Last Rating:
                            <strong>4</strong>
                            <em>
                              <img src="images/starOne.svg" alt="" />
                            </em>
                          </h3>
                          <span>6 October 2022</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="feedbackUsersBox">
                        <div className="feedbackUsersHead">
                          <strong>
                            محمود مختار<em>1</em>
                          </strong>
                          <span className="Resolved">Resolved</span>
                        </div>
                        <div className="feedbackUsersFTR">
                          <h3>
                            Last Rating:
                            <strong>4</strong>
                            <em>
                              <img src="images/starOne.svg" alt="" />
                            </em>
                          </h3>
                          <span>6 October 2022</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              
            </div>
            <div className="feedbackRight">
              <div className="feedbackRightHead">
                <ul>
                  <li>
                    <h3>Mahmoud Mokhtar </h3>{" "}
                    <span>
                      {" "}
                      Average Rating: <strong> 4</strong>{" "}
                      <em>
                        <img src="images/starOne.svg" alt="" />{" "}
                      </em>
                    </span>
                  </li>
                  <li>
                    <h4>
                      Phone Number: <span>01020402612</span>{" "}
                    </h4>{" "}
                    <span>
                      Ratings: <strong>2</strong>
                    </span>
                  </li>
                  <li>
                    <h4>
                      <span>Email: </span> M.Mokhtar@cloudabill.com
                    </h4>{" "}
                    <span>
                      Redeemed vouchers: <strong>0</strong>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="feedbackRightBody">
                <div className="accordion" id="accordionExample">
                  <div className="card">
                    <div className="card-header" id="headingOne">
                      <h2 className="mb-0">
                        <button
                          className="btn btn-link btn-block text-left"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Collapsible Group Item #1
                        </button>
                      </h2>
                    </div>

                    <div
                      id="collapseOne"
                      className="collapse show"
                      aria-labelledby="headingOne"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        Some placeholder content for the first accordion panel.
                        This panel is shown by default, thanks to the{" "}
                        <code>.show</code> class.
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" id="headingTwo">
                      <h2 className="mb-0">
                        <button
                          className="btn btn-link btn-block text-left collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          Collapsible Group Item #2
                        </button>
                      </h2>
                    </div>
                    <div
                      id="collapseTwo"
                      className="collapse"
                      aria-labelledby="headingTwo"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        Some placeholder content for the second accordion panel.
                        This panel is hidden by default.
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" id="headingThree">
                      <h2 className="mb-0">
                        <button
                          className="btn btn-link btn-block text-left collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          Collapsible Group Item #3
                        </button>
                      </h2>
                    </div>
                    <div
                      id="collapseThree"
                      className="collapse"
                      aria-labelledby="headingThree"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        And lastly, the placeholder content for the third and
                        final accordion panel. This panel is hidden by default.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedback;
