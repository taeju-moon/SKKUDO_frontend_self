import { filter } from "lodash";
import { OrderByType, OrderType, UserType } from "./../types/user";

function descendingComparator(
  a: UserType,
  b: UserType,
  orderBy: OrderByType,
  clubID: string
) {
  if (orderBy === "role") {
    const beta = new Map(Object.entries(b.registeredClubs)).get(clubID);
    const alpha = new Map(Object.entries(a.registeredClubs)).get(clubID);
    if (beta && alpha) {
      if (beta.role < alpha.role) {
        return -1;
      }
      if (beta.role > alpha.role) {
        return 1;
      }
      return 0;
    }

    return 0;
  }
  if (
    orderBy === "name" ||
    orderBy === "studentId" ||
    orderBy === "major" ||
    orderBy === "location" ||
    orderBy === "contact"
  ) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const beta = new Map(Object.entries(b.registeredClubs)).get(clubID);
  const alpha = new Map(Object.entries(a.registeredClubs)).get(clubID);

  const deepBeta = beta.moreColumns.find(
    (item: any) => item.column.key === orderBy
  );
  const deepAlpha = alpha.moreColumns.find(
    (item: any) => item.column.key === orderBy
  );
  if (deepBeta && deepAlpha) {
    if (deepBeta.value < deepAlpha.value) {
      return -1;
    }
    if (deepBeta.value > deepAlpha.value) {
      return 1;
    }
    return 0;
  }

  return 0;
}

export function getComparator(
  order: OrderType,
  orderBy: OrderByType,
  clubID: string
) {
  return order === "desc"
    ? (a: UserType, b: UserType) => descendingComparator(a, b, orderBy, clubID)
    : (a: UserType, b: UserType) =>
        -descendingComparator(a, b, orderBy, clubID);
}

export function applySortFilter(
  array: UserType[] | undefined,
  comparator: (a: UserType, b: UserType) => number,
  query: string
) {
  if (array) {
    const stabilizedThis: [UserType, number][] = array.map((el, index) => [
      el,
      index,
    ]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(
        array,
        (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  } else {
    return [];
  }
}
