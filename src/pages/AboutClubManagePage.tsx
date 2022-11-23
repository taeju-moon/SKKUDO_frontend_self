//AboutClubManagePage Page

import { useTheme } from "@mui/material";
import styled from "styled-components";
import AboutSideBar from "../components/aboutComponents/AboutSideBar";
import data from "../assets/images/usermanage/data.png";
import auth from "../assets/images/usermanage/auth.png";
import role from "../assets/images/usermanage/role.png";
import addcol from "../assets/images/usermanage/addcol.png";
import notice from "../assets/images/notice/notice.png";
import category from "../assets/images/notice/category.png";
import member from "../assets/images/member/member.png";
import calendar from "../assets/images/schedule/calendar.png";
import dup from "../assets/images/schedule/dup.png";
import club from "../assets/images/clubmanage/club.png";
import question from "../assets/images/clubmanage/question.png";
import ratio from "../assets/images/clubmanage/ratio.png";
import account from "../assets/images/account/account.png";


const AboutClubManagePageContainer = styled.div`
  // 우측으로 쌓기
  display: flex;
  padding-left: 5%;
  padding-right: 5%;
  flex-direction: column;
  flex: 1;
`;


const UserManageNoticeContainer =styled.div`
  display: flex;
  flex-direction: row;
  padding-top:5%;
  padding-bottom: 5%;
`
const UserManageNoticeMassageContainer = styled.div`
  display:flex;
  font-size: 18px;
  line-height: 50px;
  font-weight: 600;
  width:50%;
`
const UserManageNoticeImageContainer =styled.div`
  padding-left:5%;
  display:flex;
  width:70%;
`

const UserManageCategoryContainer =styled.div`
  display: flex;
  flex-direction: row;
  padding-top:5%;
  padding-bottom: 5%;
`
const UserManageCategoryMassageContainer = styled.div`
  display:flex;
  font-size: 18px;
  line-height: 50px;
  font-weight: 600;
  width:50%;
`
const UserManageCategoryImageContainer =styled.div`
  padding-right:5%;
  display:flex;
  width:90%;
`

const UserManageMemberContainer =styled.div`
  display: flex;
  flex-direction: row;
  padding-top:5%;
  padding-bottom: 5%;
`
const UserManageMemberMassageContainer = styled.div`
  display:flex;
  font-size: 18px;
  line-height: 50px;
  font-weight: 600;
  width:50%;
`
const UserManageMemberImageContainer =styled.div`
  padding-left:5%;
  display:flex;
  width: 90%;
`

const UserManageCalendarContainer =styled.div`
  display: flex;
  flex-direction: row;
  padding-top:5%;
  padding-bottom: 5%;
`
const UserManageCalendarMassageContainer = styled.div`
  display:flex;
  font-size: 18px;
  line-height: 50px;
  font-weight: 600;
  width:50%;
`
const UserManageCalendarImageContainer =styled.div`
  padding-right:5%;
  display:flex;
  width: 90%;
`

const UserManageDupContainer =styled.div`
  display: flex;
  flex-direction: row;
  padding-top:5%;
  padding-bottom: 5%;
`
const UserManageDupMassageContainer = styled.div`
  display:flex;
  font-size: 18px;
  line-height: 50px;
  font-weight: 600;
  width:50%;
`
const UserManageDupImageContainer =styled.div`
  padding-left:5%;
  display:flex;
`



const UserManageDataContainer =styled.div`
  display: flex;
  flex-direction: row;
  padding-top:5%;
  padding-bottom: 5%;
`
const UserManageDataMassageContainer = styled.div`
  display:flex;
  font-size: 18px;
  line-height: 50px;
  font-weight: 600;
  width:50%;
`
const UserManageDataImageContainer =styled.div`
  padding-right:5%;
  display:flex;
  width:90%;
`


const UserManageAuthContainer =styled.div`
  display: flex;
  flex-direction: row;
  padding-top:5%;
  padding-bottom: 5%;
`
const UserManageAuthMassageContainer = styled.div`
  display:flex;
  font-size: 18px;
  line-height: 50px;
  font-weight: 600;
  width:50%;
`
const UserManageAuthImageContainer =styled.div`
  padding-left:5%;
  display:flex;
  width:50%
`


const UserManageRoleContainer =styled.div`
  display: flex;
  flex-direction: row;
  padding-top:5%;
  padding-bottom: 5%;
`
const UserManageRoleMassageContainer = styled.div`
  display:flex;
  font-size: 18px;
  line-height: 50px;
  font-weight: 600;
  width:50%;
`
const UserManageRoleImageContainer =styled.div`
  padding-right:5%;
  display:flex;
  width:85%;
`


const UserManageAddcolContainer =styled.div`
  display: flex;
  flex-direction: row;
  padding-top:5%;
  padding-bottom: 5%;
`
const UserManageAddcolMassageContainer = styled.div`
  display:flex;
  font-size: 18px;
  line-height: 50px;
  font-weight: 600;
  width:50%;
`
const UserManageAddcolImageContainer =styled.div`
  padding-left:5%;
  display:flex;
  width:90%;
`

const UserManageClubContainer =styled.div`
  display: flex;
  flex-direction: row;
  padding-top:5%;
  padding-bottom: 5%;
`
const UserManageClubMassageContainer = styled.div`
  display:flex;
  font-size: 18px;
  line-height: 50px;
  font-weight: 600;
  width:50%;
`
const UserManageClubImageContainer =styled.div`
  padding-right:5%;
  display:flex;
  width:90%;
`

const UserManageQContainer =styled.div`
  display: flex;
  flex-direction: row;
  padding-top:5%;
  padding-bottom: 5%;
`
const UserManageQMassageContainer = styled.div`
  display:flex;
  font-size: 18px;
  line-height: 50px;
  font-weight: 600;
  width:50%;
`
const UserManageQImageContainer =styled.div`
  padding-left:5%;
  display:flex;
  width:90%;
`

const UserManageRatioContainer =styled.div`
  display: flex;
  flex-direction: row;
  padding-top:5%;
  padding-bottom: 5%;
`
const UserManageRatioMassageContainer = styled.div`
  display:flex;
  font-size: 18px;
  line-height: 50px;
  font-weight: 600;
  width:50%;
`
const UserManageRatioImageContainer =styled.div`
  padding-right:5%;
  display:flex;
`

const UserManageAccountContainer =styled.div`
  display: flex;
  flex-direction: row;
  padding-top:5%;
  padding-bottom: 5%;
`
const UserManageAccountMassageContainer = styled.div`
  display:flex;
  font-size: 18px;
  line-height: 50px;
  font-weight: 600;
  width:50%;
`
const UserManageAccountImageContainer =styled.div`
  padding-left:5%;
  display:flex;
  width:90%;
`


function AboutClubManagePage() {
  return (
    <AboutClubManagePageContainer>
      <UserManageNoticeContainer>
        <UserManageNoticeMassageContainer>현재 소속되어있는 동아리 페이지에서 공지사항을 확인할 수 있습니다.
          <br/>
          필터를 이용해 원하는 카테고리를 검색하는 것도 가능합니다!
        </UserManageNoticeMassageContainer>
        <UserManageNoticeImageContainer><img src={notice}></img></UserManageNoticeImageContainer>
      </UserManageNoticeContainer>
      <UserManageCategoryContainer>
      <UserManageCategoryImageContainer><img src={category}></img></UserManageCategoryImageContainer>
        <UserManageCategoryMassageContainer><br/>공지사항의 카테고리를 추가하는 것이 가능합니다!
          <br/>이 기능은 권한이 부여된 경우 사용가능합니다.
        </UserManageCategoryMassageContainer>
      </UserManageCategoryContainer>
      <UserManageMemberContainer>
        <UserManageMemberMassageContainer><br/>동아리의 소속인원을 확인할 수 있습니다.
        <br/>동아리원 검색이 가능하며 정렬기능이 있어 원하는 열을 기준으로 정렬도 가능합니다!
        </UserManageMemberMassageContainer>
        <UserManageMemberImageContainer><img src={member}></img></UserManageMemberImageContainer>
      </UserManageMemberContainer>
      <UserManageCalendarContainer>
      <UserManageCalendarImageContainer><img src={calendar}></img></UserManageCalendarImageContainer>
        <UserManageCalendarMassageContainer>모든 동아리원들은 등록된 동아리 일정을 확인할 수 있으며, 필터를 사용하여 카테고리별 일정을 확인할 수도 있습니다.
          <br/>카테고리 추가 및 일정 등록/삭제는 권한이 부여된 경우 사용가능합니다.
        </UserManageCalendarMassageContainer>
      </UserManageCalendarContainer>
      <UserManageDupContainer>
        <UserManageDupMassageContainer>같은날, 같은 시간에 개별적인 일정이 존재할 수 있습니다.
          <br/>SKKUDO는 중복된 일정을 일정관리에 등록할 수 있습니다!
        </UserManageDupMassageContainer>
        <UserManageDupImageContainer><img src={dup}></img></UserManageDupImageContainer>
      </UserManageDupContainer>
      <UserManageDataContainer>
      <UserManageDataImageContainer><img src={data}></img></UserManageDataImageContainer>
        <UserManageDataMassageContainer>권한이 부여된 경우에만 확인할 수 있는 동아리 관리페이지의 동아리원 분포 데이터 입니다.
          <br/>SKKUDO는 동아리원 분포 데이터 그래프를 제공하여 동아리원 관리를 지원합니다.
        </UserManageDataMassageContainer>
      </UserManageDataContainer>
      <UserManageAuthContainer>
        <UserManageAuthMassageContainer><br/><br/>권한관리 페이지에서 동아리 회장이 항목에 대하여 권한을 부여할 수 있습니다.</UserManageAuthMassageContainer>
        <UserManageAuthImageContainer><img src={auth}></img></UserManageAuthImageContainer>
      </UserManageAuthContainer>
      <UserManageRoleContainer>
        <UserManageRoleImageContainer><img src={role}></img></UserManageRoleImageContainer>
        <UserManageRoleMassageContainer><br/>유저관리 페이지에서 동아리원의 역할을 수정 및 방출할 수 있습니다.
          <br/>또한 검색 및 정렬이 가능합니다.
        </UserManageRoleMassageContainer>
      </UserManageRoleContainer>
      <UserManageAddcolContainer>
        <UserManageAddcolMassageContainer>유저관리 페이지의 우측 상단 "문자열추가" 버튼을 누르시면 다음과 같은 창이 나옵니다.
          <br/>열을 추가하여 동아리원의 정보를 추가하거나, 삭제할 수 있습니다!
        </UserManageAddcolMassageContainer>
        <UserManageAddcolImageContainer><img src={addcol}></img></UserManageAddcolImageContainer>
      </UserManageAddcolContainer>
      <UserManageClubContainer>
        <UserManageClubImageContainer><img src={club}></img></UserManageClubImageContainer>
        <UserManageClubMassageContainer><br/><br/>동아리관리 페이지에서 동아리명, 학과, 캠퍼스, 모집형태, 모집기간을 설정할 수 있습니다.</UserManageClubMassageContainer>
      </UserManageClubContainer>
      <UserManageQContainer>
        <UserManageQMassageContainer>모집관리 페이지에서 서류질문, 면접질문, 추가질문을 수정할 수 있습니다. "질문 추가하기"
          버튼을 이용하여 질문을 추가하거나, "삭제" 버튼을 이용하여 질문을 삭제할 수도 있습니다. "지원서 삭제하기" 버튼을 이용하여
          지원서 삭제 또한 가능합니다!!
        </UserManageQMassageContainer>
        <UserManageQImageContainer><img src={question}></img></UserManageQImageContainer>
      </UserManageQContainer>
      <UserManageRatioContainer>
        <UserManageRatioImageContainer><img src={ratio}></img></UserManageRatioImageContainer>
        <UserManageRatioMassageContainer><br/>모집관리 페이지의 "자동 합격 버튼"을 이용하여 자동으로 합격 산출을 할 수 있습니다!
          <br/>점수 반영비율 및 인원을 선택하여 자동으로 합격 산출을 할 수 있습니다!
        </UserManageRatioMassageContainer>
      </UserManageRatioContainer>
      <UserManageAccountContainer>
        <UserManageAccountMassageContainer>가계부 페이지는 동아리의 지출 및 수입을 관리할 수 있게 도와줍니다.
          <br/>권한이 부여된 경우 사용 가능합니다.
        </UserManageAccountMassageContainer>
        <UserManageAccountImageContainer><img src={account}></img></UserManageAccountImageContainer>
      </UserManageAccountContainer>
    </AboutClubManagePageContainer>
  );
}

export default AboutClubManagePage;