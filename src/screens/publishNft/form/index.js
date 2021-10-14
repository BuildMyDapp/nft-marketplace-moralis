import React, { useState, useRef } from 'react';
import './style.css'
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import cryptoRandomString from 'crypto-random-string';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import { create } from 'ipfs-http-client';
import ImageUploader from 'react-images-upload';
import 'dotenv'
import { useStore } from '../../ontext/GlobalState';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import 'dotenv'
// import Buffer from 'buffer';
import Loader from "react-loader-spinner";

const validationSchema = yup.object({
    // name: yup
    //   .string('Enter your name')
    //   .name('Enter a valid name')
    //   .required('name is required'),
    //   desciption: yup
    //   .string('Enter your desciption')
    //   .min(8, 'desciption should be of minimum 8 characters length')
    //   .required('desciption is required'),
    //   supply: yup
    //   .string('Enter your supply')
    //   .min(8, 'supply should be of minimum 8 characters length')
    //   .required('supply is required'),
  });
  const projectId = '1y6NPTldmnx1PJsqCnifwbXFiwC'
  const projectSecret = '1ce02a7f1ea84ac21a4e4017f786d7f3'
  // const buffer = new Buffer.from(projectId + ':' + projectSecret).toString('base64')
  const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
  
  // const client = create('https://infura-ipfs.io:5001/api/v0')
  const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth
    }
  })

  
const PublishNftForm = () => {
    return (
        <div>
              <div className="p-form-cont">
        <div className="p-form-inner-cont">
          <div className="p-form-heading-cont">
            <h3>Publish Your NFT!</h3>
          </div>
          <form onSubmit={formik.handleSubmit}>

            <p>
              <b>*Name: </b>
              Your NFT name will show as a title
                </p>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="*Name"
              variant="filled"
              color="secondary"
              value={formik.values.name}
              onChange={formik.handleChange}
              helperText={`${formik.values.name.length}/${50}`}

              className="p-form-input"

            />
            <p>
              <b>*Email: </b>
              Your Email
                </p>
            <TextField
              fullWidth
              id="user_email"
              name="user_email"
              label="*Email"
              variant="filled"
              color="secondary"
              type="email"
              value={formik.values.user_email}
              helperText={`${formik.values.user_email.length}/${50}`}
              onChange={formik.handleChange}
              className="p-form-input"

            />
            <p>
              <b>*Description: </b>
              The description will be included on the item's detail page underneath its image.
              </p>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="*Description"
              helperText={`${formik.values.description.length}/${500}`}
              variant="filled"
              color="secondary"
              value={formik.values.description}
              onChange={formik.handleChange}
              className="p-form-input"
            />
            <p>
              <b>External Link: </b>
              Banana will include a link to this URL on this item's detail page, so that
               users can click to learn more about it. You are welcome to link to your own webpage with
               more details.
              </p>
            <TextField
              fullWidth
              id="external_link"
              name="external_link"
              label="External link"
              variant="filled"
              color="secondary"
              helperText={`${formik.values.external_link.length}/${110}`}
              value={formik.values.external_link}
              onChange={formik.handleChange}
              className="p-form-input"
            />

            <p>
              <b>*Supply: </b>
              The number of copies that can be minted.
              </p>
            <TextField
              fullWidth
              variant="filled"
              color="secondary"
              id="supply"
              name="supply"
              label="*Supply"
              value={formik.values.supply}
              helperText={`${formik.values.supply.length}/${3}`}
              onChange={formik.handleChange}
              className="p-form-input"
            // error={formik.touched.email && Boolean(formik.errors.email)}
            // helperText={formik.touched.email && formik.errors.email}
            />
            {
              Math.sign(formik.values.price) != "-1" ?
                "" : <span style={{ color: "red" }}>Value Should be positive</span>
            }
            <p>
              <b>*Price: </b>
              Price of your NFT.
              </p>
            <TextField
              fullWidth
              id="filled-secondary"
              name="price"
              label="*Price"
              variant="filled"
              color="secondary"
              value={formik.values.price}
              helperText={`${formik.values.price.length}/${10}`}
              onChange={formik.handleChange}
              className="p-form-input"


            />

            <p>
              <b>*Creator Name: </b>
              Creator name of this NFT.
              </p>
            <TextField
              fullWidth
              variant="filled"
              color="secondary"
              id="creator_name"
              name="creator_name"
              label="*Creator name"
              helperText={`${formik.values.creator_name.length}/${50}`}
              value={formik.values.creator_name}
              onChange={formik.handleChange}
              className="p-form-input"
            // error={formik.touched.email && Boolean(formik.errors.email)}
            // helperText={formik.touched.email && formik.errors.email}
            />
            <p>
              <b>*Category: </b>
              This is the Category where your item will appear.
                                   </p>
            <InputLabel htmlFor="age-native-helper">Category</InputLabel>
            <NativeSelect
              value={formik.values.category}
              onChange={formik.handleChange}
              className="p-form-input-category"

              inputProps={{
                name: 'category',
                id: 'age-native-helper',
              }}
            >
              <option aria-label="None" value="" />
              <option value={"Education"}>Education</option>
              <option value={"Medical"}>Medical</option>
              <option value={"Memorial"}>Memorial</option>
              <option value={"Emergency"}>Emergency</option>
              <option value={"Nonprofit"}>Nonprofit</option>
              <option value={"Animals"}>Animals</option>
              <option value={"Environment"}>Environment</option>
              <option value={"Business"}>Business</option>
              <option value={"Community"}>Community</option>
              <option value={"Competition"}>Competition </option>
              <option value={"Creative"}>Creative</option>
              <option value={"Event"}>Event</option>
              <option value={"Faith"}>Faith </option>
              <option value={"Family"}>Family </option>
              <option value={"Sports"}>Sports </option>
              <option value={"Travel"}>Travel </option>
              <option value={"Volunteer"}>Volunteer </option>
              <option value={"Wishes"}>Wishes </option>


            </NativeSelect>
            <div className="p-form-image-cont">
              <ImageUploader
                withIcon={true}
                withPreview={true}
                buttonText='Choose images'
                onChange={onChange}
                imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                maxFileSize={5242880}
                singleImage={true}
                label="JPG PNG GIF JPEG, MAX SIZE 5MB"
                fileSizeError="file too big, max 5mb allowed"
              />
              <span>Max Size 5mb</span>

            </div>
            <br />
            {
              web3 ?
                <>
                  {
                    Math.sign(formik.values.price) != "-1" ?
                      <button className="p-form-btn" variant="contained" fullWidth type="submit">
                        {
                          loading ?
                            "Submit" :
                            <Loader
                              type="ThreeDots"
                              color="#f2d02d"
                              height={20}
                              width={100}
                              timeout={10000}
                            //3 secs
                            />
                        }
                      </button>
                      :
                      " "

                  }
                </>

                :
                ""
            }

          </form>
          {
            web3 ?
              ""
              :
              <button className="p-form-btn" variant="contained" fullWidth >
                Connect Wallet
      </button>
          }
        </div>
      </div>
   

        </div>
    )
}

export default PublishNftForm
