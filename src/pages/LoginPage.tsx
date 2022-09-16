import styled from "styled-components";

const LoginPageContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: aliceblue;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LoginInput = styled.input``;

function LoginPage() {
  return (
    <LoginPageContainer>
      <LoginForm>
        <LoginInput></LoginInput>
        <LoginInput></LoginInput>
      </LoginForm>
    </LoginPageContainer>
  );
}

export default LoginPage;
