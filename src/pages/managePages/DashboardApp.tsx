// import { faker } from "@faker-js/faker";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
import AppWidgetSummary from "../../components/dashboardAppComponents/AppWidgetSummary";
import AppTasks from "../../components/dashboardAppComponents/AppTasks";
import AppWebsiteVisits from "../../components/dashboardAppComponents/AppWebsiteVisits";
import { useRecoilValue } from "recoil";
import { currentClubInfoState } from "../../atoms/utilAtom";
import { useQuery } from "react-query";
import { UserType } from "../../types/user";
import { useParams } from "react-router-dom";
import {
  getAppliedUserByClubID,
  getClubMembers,
  getTodosByClubID,
} from "../../utils/fetch";
import { AppliedUserType } from "../../types/apply";
import { useEffect } from "react";
import { ToDoType } from "../../types/todo";
import moment from "moment";
import AppConversionRates from "../../components/dashboardAppComponents/AppConversionRates";
// components
// import Page from '../components/Page';
// import Iconify from '../components/Iconify';
// sections
// import {
//   AppTasks,
//   AppNewsUpdate,
//   AppWebsiteVisits,
//   AppWidgetSummary,
//   AppConversionRates,
// } from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const currentClubInfo = useRecoilValue(currentClubInfoState);
  const { clubID } = useParams();

  // useEffect(() => {
  //   console.log(currentClubInfo);
  // }, [currentClubInfo]);

  const { data: clubMembersData } = useQuery<UserType[]>(
    "getClubMembers",
    () => getClubMembers(clubID || ""),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error: any) => alert(error.response.data.error),
      retry: false,
      retryOnMount: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const { data: appliedUsersData } = useQuery<AppliedUserType[]>(
    "getAppliedUserByClubID",
    () => getAppliedUserByClubID(clubID || ""),
    {
      onSuccess: (data) => {
        // console.log(data);
      },
      onError: (error: any) => {
        alert(error.response.data.error);
      },
      retry: false,
      retryOnMount: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const { data: todoData, isLoading } = useQuery<ToDoType[]>(
    "getTodosByClubID",
    () => getTodosByClubID(clubID || ""),
    {
      onSuccess: (data) => {
        // console.log(data);
      },
      onError: (error: any) => alert(error.response.data.error),
      retry: false,
      retryOnMount: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const calculateTodayTodos = (todos: ToDoType[]) => {
    const today = moment(new Date()).format("YYYY-MM-DD");
    const result = todos.filter(
      (todo) => moment(todo.date).format("YYYY-MM-DD") === today
    );

    return result.length;
  };

  const calculateMonthTodos = (todos: ToDoType[]) => {
    const today = moment(new Date()).format("YYYY-MM-DD");
    const thisMonth = moment(new Date()).format("YYYY-MM");
    const result = todos.filter(
      (todo) =>
        moment(todo.date).format("YYYY-MM") === thisMonth &&
        moment(todo.date).format("YYYY-MM-DD") >= today
    );

    return result.length;
  };

  const studentIDExample = (members: UserType[]) => {
    const result = members.map((member) => member.studentId.slice(2, 4));
    // console.log(Array.from(new Set(result)).sort());
    return Array.from(new Set(result)).sort();
  };

  const studentIDData = (members: UserType[]) => {
    const result = new Map(studentIDExample(members).map((ele) => [ele, 0]));
    members.forEach((member) => {
      const id = member.studentId.slice(2, 4);
      // console.log(result.get(id));

      const prev = result.get(id);
      if (typeof prev === "undefined") {
        result.set(id, 0);
      } else {
        result.set(id, prev + 1);
      }
    });

    return Array.from(result.values());
  };

  const studentMajorData = (members: UserType[]) => {
    const result = new Map<string, number>();
    members.forEach((member) => {
      if (result.get(member.major)) {
        result.set(member.major, result.get(member.major)! + 1);
      } else {
        result.set(member.major, 1);
      }
    });

    const realResult: { label: string; value: number }[] = [];
    result.forEach((value, key) => realResult.push({ label: key, value }));
    return realResult;
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="동아리원 수"
            total={
              clubMembersData ? clubMembersData.length : "확인할 수 없습니다."
            }
            icon={"ic:round-people-alt"}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="지원자 수"
            total={
              appliedUsersData ? appliedUsersData.length : "확인할 수 없습니다."
            }
            color="info"
            icon={"material-symbols:accessibility-new"}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="오늘 일정"
            total={
              todoData ? calculateTodayTodos(todoData) : "확인할 수 없습니다."
            }
            color="warning"
            icon={"ri:todo-fill"}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="이번달 남은 일정"
            total={
              todoData ? calculateMonthTodos(todoData) : "확인할 수 없습니다."
            }
            color="error"
            icon={"ri:calendar-todo-fill"}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={12}>
          <AppWebsiteVisits
            title="학번 분포"
            subheader="동아리원들의 학번 분포 그래프"
            chartLabels={
              clubMembersData
                ? studentIDExample(clubMembersData)
                : ["16", "17", "18", "19", "20", "21", "22", "23"]
            }
            chartData={[
              {
                name: "학번",
                type: "area",
                fill: "gradient",
                data: clubMembersData
                  ? studentIDData(clubMembersData)
                  : [1, 3, 5, 2, 4, 1, 1],
              },
            ]}
          />
        </Grid>

        {/* <Grid item xs={12} md={6} lg={4}></Grid> */}

        <Grid item xs={12} md={6} lg={12}>
          <AppConversionRates
            title="학과 분포"
            subheader="동아리원들의 학과 분포 그래프"
            chartData={
              clubMembersData
                ? studentMajorData(clubMembersData)
                : [
                    { label: "Italy", value: 400 },
                    { label: "Japan", value: 430 },
                    { label: "China", value: 448 },
                    { label: "Canada", value: 470 },
                    { label: "France", value: 540 },
                    { label: "Germany", value: 580 },
                    { label: "South Korea", value: 690 },
                    { label: "Netherlands", value: 1100 },
                    { label: "United States", value: 1200 },
                    { label: "United Kingdom", value: 1380 },
                  ]
            }
          />
        </Grid>

        {/* <Grid item xs={12} md={6} lg={4}>
            
          </Grid> */}

        {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid> */}

        {/* <Grid item xs={12} md={6} lg={4}>
            
          </Grid> */}

        {/* <Grid item xs={12} md={6} lg={4}>
            
          </Grid> */}

        {/* <Grid item xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: "1", label: "Create FireStone Logo" },
              { id: "2", label: "Add SCSS and JS files if required" },
              { id: "3", label: "Stakeholder Meeting" },
              { id: "4", label: "Scoping & Estimations" },
              { id: "5", label: "Sprint Showcase" },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}
