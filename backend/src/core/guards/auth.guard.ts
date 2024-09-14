// import {
//   CanActivate,
//   ExecutionContext,
//   HttpException,
//   HttpStatus,
//   Injectable,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(
//     private _jwtService: JwtService,
//     private reflector: Reflector,
//   ) {}

//   canActivate(context: ExecutionContext): boolean {
//     const req = context.switchToHttp().getRequest();
//     const token = req.headers['token']; // Use req.headers['token'] to extract the token

//     // Check if the token is present
//     if (!token) {
//       throw new HttpException(
//         'User must be authenticated. Token is missing.',
//         HttpStatus.UNAUTHORIZED,
//       );
//     }

//     try {
//       // Verify the token
//       const decoded = this._jwtService.verify(token, { secret: 'gaher' });

//       // Attach decoded information to the request object
//       req.user = {
//         role: decoded.role,
//         userId: decoded.userId,
//         userName: `${decoded.fName} ${decoded.lName}`,
//       };

//       // Check roles if specified
//       const roles = this.reflector.get<string[]>('roles', context.getHandler());

//       // If no roles are specified, allow access
//       if (!roles) return true;

//       // Validate the user's role
//       if (roles.includes(decoded.role)) {
//         return true;
//       } else {
//         throw new HttpException(
//           'You do not have permission to access this resource.',
//           HttpStatus.FORBIDDEN,
//         );
//       }
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (err) {
//       // Catch any errors during token verification
//       throw new HttpException(
//         'Invalid or expired token or Unauthorazied.',
//         HttpStatus.UNAUTHORIZED,
//       );
//     }
//   }
// }







//----------------------------------------------------
// احمد
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    // استخراج التوكن من الهيدر باسم 'token'
    const token = req.headers['token'];

    // التحقق من وجود التوكن
    if (!token) {
      throw new HttpException(
        'User must be authenticated. Token is missing.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      // التحقق من صحة التوكن
      const decoded = this._jwtService.verify(token, { secret: 'gaher' });

      // إضافة معلومات المستخدم إلى الطلب
      req.user = {
        role: decoded.role,
        userId: decoded.userId,
        userName: `${decoded.fName} ${decoded.lName}`,
      };

      // التحقق من الأدوار إذا كانت مطلوبة
      const roles = this.reflector.get<string[]>('roles', context.getHandler());

      // السماح بالوصول إذا لم تكن هناك أدوار محددة
      if (!roles) return true;

      // التحقق من دور المستخدم
      if (roles.includes(decoded.role)) {
        return true;
      } else {
        throw new HttpException(
          'You do not have permission to access this resource.',
          HttpStatus.FORBIDDEN,
        );
      }
    } catch (err) {
      throw new HttpException(
        'Invalid or expired token.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
