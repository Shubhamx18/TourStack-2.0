variable "aws_region" {
  default = "ap-south-1"
}

variable "ec2_ami" {
  default = "ami-0f5ee92e2d63afc18"
}

variable "instance_type" {
  default = "t3.medium"
}

variable "volume_size" {
  default = 20
}

variable "key_name" {
  default = "terra-key-ec2-latest"
}

variable "public_key_path" {
  default = "terra_key_ec2.pub"
}
