import { API_ENDPOINT } from "@/App";
import { emailRegex } from "@/libs/regex";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Button from "./Button";
import { accessTokenAtom, accessTokenExpirationAtom } from "@/libs/atoms";
import useMutation from "@/hooks/useMutation";

interface LogInFormData {
  id: string;
  password: string;
}

export default function LoginForm() {
  const setAccessToken = useSetRecoilState(accessTokenAtom);
  const setAccessTokenExpiration = useSetRecoilState(accessTokenExpirationAtom);

  const [isMasked, setIsMasked] = useState<boolean>(true);

  const { register, handleSubmit, formState } = useForm<LogInFormData>();

  const { mutate: login, isLoading: loginLoading } =
    useMutation("users/auth/signin");

  const navigate = useNavigate();

  const onSubmit = async (data: LogInFormData) => {
    const response = await login({ email: data.id, password: data.password });

    if (!response.ok) {
      alert("로그인에 실패했습니다.");
    } else {
      const { accessToken, accessTokenExpirationDateTime } = response.data;

      setAccessToken(accessToken);
      setAccessTokenExpiration(accessTokenExpirationDateTime);

      navigate("/clubs");
    }
  };
  return (
    <form
      className="flex justify-center items-center h-full w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="rounded-md w-full flex flex-col space-y-4">
        <ul className="flex flex-col space-y-4">
          <li>
            <div className="flex items-center"></div>
            <input
              placeholder="이메일"
              {...register("id", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: emailRegex,
                  message: "이메일 형식이 아닙니다.",
                },
              })}
              type="email"
              id="id"
              className="w-full rounded-md bg-gray-100 p-4 outline-none"
            />
          </li>
          <li>
            <div className="relative">
              <div className="flex items-center"></div>
              <input
                placeholder="비밀번호"
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                  minLength: {
                    value: 8,
                    message: "비밀번호는 8자 이상이어야 합니다.",
                  },
                  maxLength: {
                    value: 20,
                    message: "비밀번호는 20자 이하여야 합니다.",
                  },
                })}
                type={isMasked ? "password" : "text"}
                id="password"
                className="w-full rounded-md bg-gray-100 p-4 pr-14 outline-none"
              />
              <FontAwesomeIcon
                onClick={() => setIsMasked((prev) => !prev)}
                icon={isMasked ? faEye : faEyeSlash}
                size="lg"
                className="absolute right-0 p-4 cursor-pointer"
              />
            </div>
          </li>
        </ul>
        <Button className="w-full">
          <p>로그인</p>
        </Button>
      </div>
    </form>
  );
}
