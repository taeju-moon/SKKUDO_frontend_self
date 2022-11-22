import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ClubType } from "../../types/club";
import { getOneClub, uploadImage, BASE_URL } from "../../utils/fetch";
import { FaPen } from "react-icons/fa";
import moment from "moment";
import { motion } from "framer-motion";
import UpdateDialog from "../../components/manageClubCompnents/UpdateDialog";
import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { clubUpdateState } from "../../atoms/alertAtom";
import CardMedia from "@mui/material/CardMedia";
import { Button, IconButton, Box } from "@mui/material";

interface TagType {
  _id: string;
  clubId: string | undefined;
  name: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

const ManageClubContainer = styled.div`
  padding: 50px;
  padding-left: 100px;
`;
const ClubName = styled.div`
  border-bottom: 1px solid #0c4426;
  display: inline-block;
  padding: 10px;
  font-size: 30px;
  margin-bottom: 50px;
`;

const Label = styled.span`
  display: inline-block;
  margin-right: 20px;
  font-size: 35px;
`;

const RowContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  justify-content: space-between;
  font-size: 20px;
  margin-bottom: 80px;
`;

const InfoContainer = styled.div`
  border-bottom: 1px solid #0c4426;
  display: inline-block;
  padding: 10px;
`;

const BtnContainer = styled(motion.button)`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: inline;
  justify-content: center;
  align-items: center;
  margin: 0;
  border: none;
  background-color: transparent;
`;

const ImageContainer = styled.div`
  margin-top: 40px;
  width: 100%;
  max-width: 1000px;
  height: 600px;
  border: 1px dashed #0c4426;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ManageClub() {
  const { clubID } = useParams();
  const { data: clubData, isLoading: isClubDataLoading } = useQuery<ClubType>(
    "getOneClub",
    () => getOneClub(clubID || ""),
    {
      onSuccess: (data) => {},
      onError: (error: any) => alert(error.response.data.error),
    }
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const setClubUpdate = useSetRecoilState(clubUpdateState);

  const handleEditBtnClick = (keyword: string) => {
    setDialogOpen(true);
    setClubUpdate({ keyword });
  };

  const [value, setValue] = useState<string>(clubData?.type.name as string);
  const [file, setFile] = useState();

  const onChangeImage = (e: any) => {
    setFile(e.target.files[0]);
  };

  const onImageSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file as unknown as Blob);
    uploadImage(clubID as string, formData)
      .then((data) => {
        alert("업로드에 성공했습니다.");
        window.location.reload();
      })
      .catch(() => alert("알 수 없는 오류가 발견되었습니다."));
  };

  return (
    <ManageClubContainer>
      {isClubDataLoading ? (
        <div>동아리 데이터가 없습니다</div>
      ) : (
        <>
          {/* <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" type="file" />
          </IconButton>
          <form method="post" encType="multipart/form-data">
            <input
              className="btn btn-success"
              type="file"
              id="file"
              onChange={onChangeImage}
            />
            <button className="btn btn-success" onClick={onImageSubmit}>
              Upload
            </button>
          </form> */}
          <ClubName>
            <Label>{clubData?.name}</Label>
            <BtnContainer
              style={{ width: "30px", height: "30px" }}
              whileHover={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              onClick={() => handleEditBtnClick("name")}
            >
              <FaPen />
            </BtnContainer>
          </ClubName>
          <RowContainer>
            <InfoContainer>
              <Label>{clubData?.type.name}</Label>
              <BtnContainer
                whileHover={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                onClick={() => handleEditBtnClick("typeName")}
              >
                <FaPen />
              </BtnContainer>
            </InfoContainer>
            <InfoContainer>
              <Label>{clubData?.location}</Label>
              <BtnContainer
                whileHover={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                onClick={() => handleEditBtnClick("location")}
              >
                <FaPen />
              </BtnContainer>
            </InfoContainer>
          </RowContainer>
          <InfoContainer
            style={{ marginBottom: "50px", display: "inline-block" }}
          >
            <Label>{clubData?.recruitType}</Label>
            <BtnContainer
              whileHover={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              onClick={() => handleEditBtnClick("recruitType")}
            >
              <FaPen />
            </BtnContainer>
          </InfoContainer>
          <RowContainer>
            <InfoContainer
              style={{
                opacity: clubData?.recruitType === "상시모집" ? "0.3" : "1",
              }}
            >
              <Label>
                {moment(clubData?.recruitStart).format("YYYY-MM-DD")}
              </Label>
              <BtnContainer
                disabled={clubData?.recruitType === "상시모집" ? true : false}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                onClick={() => handleEditBtnClick("recruitStart")}
              >
                <FaPen />
              </BtnContainer>
            </InfoContainer>
            <InfoContainer
              style={{
                opacity: clubData?.recruitType === "상시모집" ? "0.3" : "1",
              }}
            >
              <Label>{moment(clubData?.recruitEnd).format("YYYY-MM-DD")}</Label>
              <BtnContainer
                disabled={clubData?.recruitType === "상시모집" ? true : false}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                onClick={() => handleEditBtnClick("recruitEnd")}
              >
                <FaPen />
              </BtnContainer>
            </InfoContainer>
          </RowContainer>
          <InfoContainer>
            <Label>동아리 이미지 업로드</Label>
          </InfoContainer>
          <ImageContainer>
            {clubData ? (
              <>
                <img src={BASE_URL + "/" + clubData.image} alt="" />
              </>
            ) : (
              ""
            )}
          </ImageContainer>
          <Box sx={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              component="label"
              color="success"
              sx={{ marginLeft: "20px", marginRight: "20px" }}
            >
              <input
                accept="image/*"
                multiple
                type="file"
                onChange={onChangeImage}
              />
            </Button>
            <Button
              variant="contained"
              component="label"
              onClick={onImageSubmit}
              color="success"
            >
              Upload
            </Button>
          </Box>
        </>
      )}
      <UpdateDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </ManageClubContainer>
  );
}

export default ManageClub;
