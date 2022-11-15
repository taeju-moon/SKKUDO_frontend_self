import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../atoms/userAtom";
import FormTitle from "../components/FormTitle";
import { AppliedUserType, ApplierType, ApplyFormType } from "../types/apply";
import { ColumnType } from "../types/common";
import { VerifyUserResponseType } from "../types/user";
import {
  createAppliedUser,
  getApplierByClubID,
  verifyUser,
} from "../utils/fetch";

const ApplyWrapper = styled("div")({
  paddingTop: "180px",
  paddingBottom: "100px",
});

const ApplyClubPageContainer = styled("form")({
  paddingTop: "50px",
  width: "100%",
  maxWidth: "1024px",
  backgroundColor: "#fff",
  borderRadius: "3px",
  margin: "0 auto",
  paddingBottom: "70px",
  position: "relative",
  boxShadow: "5px 5px 5px rgba(0,0,0,0.5)",
});

const ApplyInputContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "40px",
  gap: "40px",
  marginBottom: "70px",
  marginTop: "40px",
});

const InputCell = styled("div")({});
const InputTitle = styled("div")({
  marginBottom: "20px",
});

type answerType = Map<number, string>;
type subAnswerType = Map<string, string>;

function ApplyPage() {
  const { clubID } = useParams();
  const applierInfo = useRecoilValue(userInfoState);

  const { data, isLoading } = useQuery<ApplierType>(
    "getApplierByClubID",
    () => getApplierByClubID(clubID || ""),
    {
      onSuccess: (data) => {
        // console.log(data);
      },
      onError: (error) => console.log(error),
    }
  );

  const { mutate } = useMutation(
    (applierInfo: ApplyFormType) => createAppliedUser(applierInfo),
    {
      onSuccess: (data) => console.log(data),
      onError: (error) => console.log(error),
    }
  );

  const [answers, setAnswers] = useState<answerType>(new Map());
  const [subAnswers, setSubAnswers] = useState<subAnswerType>(new Map());

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number
  ) => {
    setAnswers(new Map(answers.set(idx, event.target.value)));
  };

  // console.log(Array.from(answers.values()));

  const handleSubInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    setSubAnswers(new Map(subAnswers.set(key, event.target.value)));
  };

  const handleApplySubmit = () => {
    // console.log(Array.from(subAnswers.keys()));
    const tempMoreColumns: {
      column: ColumnType;
      value: String;
    }[] = [];
    if (data) {
      data.appliedUserColumns.forEach((col) =>
        tempMoreColumns.push({
          column: col,
          value: subAnswers.get(col._id) || "",
        })
      );
    }
    console.log(tempMoreColumns);
    const tempApplyInfo: ApplyFormType = {
      clubId: clubID || "",
      userID: applierInfo.userId,
      studentId: applierInfo.studentId,
      name: applierInfo.name,
      major: applierInfo.major,
      moreColumns: tempMoreColumns,
      documentAnswers: Array.from(answers.values()),
      documentScores: [],
      interviewScores: [],
    };
    // console.log(tempApplyInfo);
    mutate(tempApplyInfo);
  };

  return (
    <ApplyWrapper>
      <ApplyClubPageContainer>
        <FormTitle title="동아리 지원서" />
        <ApplyInputContainer>
          {isLoading ? (
            <div>아직 지원을 받고 있지 않는 동아리입니다</div>
          ) : (
            data?.documentQuestions.map((question, index) => (
              <InputCell key={question}>
                <InputTitle>{question}</InputTitle>
                <TextField
                  required
                  sx={{ width: "100%", input: { backgroundColor: "#fff" } }}
                  label="답변을 작성하세요"
                  variant="outlined"
                  multiline
                  rows={5}
                  onChange={(event) => handleInputChange(event, index)}
                />
              </InputCell>
            ))
          )}
          {isLoading ? (
            <div>아직 지원을 받고 있지 않는 동아리입니다</div>
          ) : (
            data?.appliedUserColumns.map((column) => (
              <InputCell key={column._id}>
                <InputTitle>{column.key}</InputTitle>
                <TextField
                  required
                  sx={{ width: "100%", input: { backgroundColor: "#fff" } }}
                  label="답변을 작성하세요"
                  variant="outlined"
                  multiline
                  rows={1}
                  onChange={(event) => handleSubInputChange(event, column._id)}
                />
              </InputCell>
            ))
          )}
        </ApplyInputContainer>

        <Button
          sx={{ position: "absolute", right: "20px" }}
          onClick={handleApplySubmit}
          variant="outlined"
        >
          submit
        </Button>
      </ApplyClubPageContainer>
    </ApplyWrapper>
  );
}

export default ApplyPage;
