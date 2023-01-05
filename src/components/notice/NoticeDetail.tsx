import { Chip } from "@mui/material";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isNoticeDetailOpenState } from "../../atoms/utilAtom";
import { ClickedNoticeInfoType } from "../../types/notice";

interface NoticeDetailElementType {
  isNoticeDetailOpen: boolean;
}
const NoticeDetailOverlay = styled.div<NoticeDetailElementType>`
  position: fixed;
  top: 0;
  left: 0;
  display: ${(props) => (props.isNoticeDetailOpen ? "block" : "none")};
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
`;

const NoticeBoard = styled.div<NoticeDetailElementType>`
  position: fixed;
  top: 10%;
  transform: translateX(-50%);
  left: 50%;
  width: 90%;
  max-width: 1024px;
  height: 800px;
  background-color: white;
  border-radius: 20px;
  display: ${(props) => (props.isNoticeDetailOpen ? "flex" : "none")};
  flex-direction: column;
  padding: 20px;
  z-index: 10;
`;

const NoticeTitle = styled.div`
  width: 100%;
  border-radius: 20px;
  height: 60px;
  color: #0c4426;
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(12px + 1.3vw);
  margin-bottom: 20px;
`;
const NoticeTagsContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-weight: 800;
`;
const NoticeWriter = styled.div`
  width: 100%;
  text-align: end;
  font-size: 20px;
  padding-right: 40px;
  margin-bottom: 20px;
`;
const NoticeContent = styled.div`
  width: 100%;
  border-radius: 20px;
  color: #0c4426;
  border: 1px solid;
  flex: 1;
  padding: 20px;
  font-size: calc(12px + 1.2vw);
  overflow-y: scroll;
  white-space: pre;
`;

function NoticeDetail({ noticeInfo }: { noticeInfo: ClickedNoticeInfoType }) {
  const [isNoticeDetailOpen, setIsNoticeDetailOpen] = useRecoilState(
    isNoticeDetailOpenState
  );
  const handleOverlayClick = () => {
    setIsNoticeDetailOpen(false);
  };

  return (
    <>
      <NoticeDetailOverlay
        isNoticeDetailOpen={isNoticeDetailOpen}
        onClick={handleOverlayClick}
      />
      <NoticeBoard isNoticeDetailOpen={isNoticeDetailOpen}>
        <NoticeTitle>{noticeInfo.title}</NoticeTitle>
        <NoticeTagsContainer>
          {noticeInfo.noticeTags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              sx={{
                backgroundColor: "#0c4426",
                color: "#dde143",
                padding: "10px",
                fontSize: "15px",
              }}
            />
          ))}
        </NoticeTagsContainer>
        <NoticeWriter>{noticeInfo.writer}</NoticeWriter>
        <NoticeContent>{noticeInfo.content}</NoticeContent>
      </NoticeBoard>
    </>
  );
}

export default NoticeDetail;
