import ApiAdapter from "@/common/api/api-adapter";
import {BackendApiAdapter} from "@/common/api/adapter-instances";
import {LoginResponseDto} from "@/features/auth/api/dto";
import {ApiResponse} from "@/common/api/dto";

class AuthRepository {
  constructor(private readonly apiAdapter: ApiAdapter) {
  }

  public authorize(email: string, password: string) {
    return this.apiAdapter.post<ApiResponse<LoginResponseDto>>("/v1/user/login", { email, password });
  }
}

const authRepository = new AuthRepository(BackendApiAdapter);

export default authRepository;
