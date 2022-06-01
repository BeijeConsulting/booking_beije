import React, { useState } from "react";

import "./UploadFoto.scss";

//ANT DESIGN
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
// import GoBackButton from '../../../../components/backOffice/hookComponents/goBackButton/GoBackButton';

const UploadFoto = (props) => {
  const { t } = useTranslation();

  const { addFotoStructure } = props;

console.log(props);

  const [state, setState] = useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: props.lista_immagini.length===0 ? [] : props.lista_immagini.map((img, index) => {return {
      uid: img.uid,
      imgName: `${index}`,
      url: img.urlImage,
      status: 'done'
    }}),
  });

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel = () => setState({ ...state, previewVisible: false });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setState({
      ...state,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  const handleChange = ({ fileList }) => {
    setState({ fileList });
    addFotoStructure(fileList);
  };

  const { previewVisible, previewImage, fileList, previewTitle } = state;

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>{t("bo.components.uploadPhoto.upload")}</div>
    </div>
  );

  const blockAutoPostPhoto = () => {
    return false;
  };

  return (
    <div className="container_upload_foto">
      <div>
        <Upload
          // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={blockAutoPostPhoto}
          name="photos"
        >
          {fileList.length < 5 && (
            <div className="upload_foto_struture">{uploadButton}</div>
          )}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    </div>
  );
};

export default UploadFoto;