import React, { Fragment, useState } from 'react';
import { makeStyles, ButtonBase } from '@material-ui/core';
import PictureIcon from '@material-ui/icons/BurstMode';

const useStyles = makeStyles({
  container: {
    width: 300,
    height: 100,
    border: '2px dashed #a1a1a1',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'copy',
  },
  preview: {
    width: 300,
    borderRadius: 5,
  }
});

const PictureUpload = ({ onPictureSelected }) => {
  const [base64, setBase64] = useState(null);
  const classes = useStyles();
  let input;

  const handleFileChange = async e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64(reader.result);
      onPictureSelected(reader.result);
    };
  };

  return (
    <Fragment>
      <input
        style={{ display: 'none' }}
        ref={ref => input = ref}
        type="file"
        onChange={handleFileChange}
      />
      
      {
        !base64 && (
          <ButtonBase onClick={() => input.click()}>
            <div className={classes.container}>
              <PictureIcon color="disabled" />
            </div>
          </ButtonBase>
        )
      }

      {
        base64 && (
          <img className={classes.preview} src={base64} alt="Auction" />
        )
      }
    </Fragment>
  );
};

export default PictureUpload;