export const userInfoRules = {
  code: [
    { required: true, message: '验证码不能为空', trigger: 'blur' }
  ],
  user_did: [
    { required: true, message: '验证码不能为空', trigger: 'blur' },
    { min: 128, max: 128, message: '非法的DID,DID长度为128位', trigger: 'blur' }
  ],
  old_code: [
    { required: true, message: '验证码不能为空', trigger: 'blur' }
  ],
  new_email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { required: false, message: '请输入正确的邮箱格式', type: 'email', trigger: 'blur' }
  ],
  new_code: [
    { required: true, message: '验证码不能为空', trigger: 'blur' }
  ],
  phone_number: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确手机号' }
  ]
}
