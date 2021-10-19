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
import { useStore } from '../../../context/GlobalState';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Toast } from 'primereact/toast';
// import { useNavigate } from 'react-router-dom';
import 'dotenv'
// import Buffer from 'buffer';
import Loader from "react-loader-spinner";

import { mintNft } from '../../../store/asyncActions';

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
  // const projectId = '1y6NPTldmnx1PJsqCnifwbXFiwC'
  // const projectSecret = '1ce02a7f1ea84ac21a4e4017f786d7f3'
  // // const buffer = new Buffer.from(projectId + ':' + projectSecret).toString('base64')
  // const auth =
  //   'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
  
  // // const client = create('https://infura-ipfs.io:5001/api/v0')
  // const client = create({
  //   host: 'ipfs.infura.io',
  //   port: 5001,
  //   protocol: 'https',
  //   headers: {
  //     authorization: auth
  //   }
  // })
  const client = create('https://ipfs.infura.io:5001/api/v0')

  
const PublishNftForm = () => {

  const toast = useRef(null);
  const [{ web3, accounts, apiUrl,contract,colletralContract }, dispatch] = useStore();
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  const handleOpenWalletModal = () => {
    setOpenWalletModal(true);
  };

  const handleCloseWalletModal = () => {
    setOpenWalletModal(false);
  };

  const [image_uri, updateFileUrl] = useState(``);
  async function onChange(e) {
    const file = e

    console.log("colletralContract", colletralContract)
    try {
      setLoading(false);
      const added = await client.add(file)
      console.log("added", added, image_uri)
      const url = `https://infura-ipfs.io/ipfs/${added.path}`
      updateFileUrl(url);
      setLoading(true);

      // return file;
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }
  console.log("apiUrl", apiUrl)

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      external_link: "",
      creator_name: "",

    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      // values.imgUri = fileUrl
      console.log("values", values)
      handlePublishNft(values.name, values.description,
     values.external_link
      )
    },
  });

  const handlePublishNft = async (name, description, external_link) => {
    try {
      // let m = await getBalance(web3,accounts);
      // let slug = cryptoRandomString({ length: 10, type: 'alphanumeric' });
      const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${process.env.REACT_APP_SIGN}`);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,

        body: JSON.stringify({
          name, description, image_uri, external_link
      
        })
      };
      let submitForm = await fetch(`${apiUrl}save_nft`, requestOptions)
      submitForm = await submitForm.json();
      if (submitForm && submitForm.status == false) throw submitForm.error;
      let tokenIdSupply = await contract.methods
      .totalSupply().call();
      let tId = tokenIdSupply;

      let token_uri = `${apiUrl}get_nft?token_id=${tId}`
    

      await mintNft(web3,contract,accounts,100,token_uri,apiUrl,name)
      console.log("submitForkm", submitForm)
    
    }
    catch (error) {
      // toast.current.show({ severity: 'error', summary: 'Failed!', detail: error });
  
      console.log("submitForm", error)
    }
  }
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
