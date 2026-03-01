resource "aws_instance" "knox_ec2" {
  ami           = "ami-0f58b397bc5c1f2e8" # Amazon Linux 2 (ap-south-1)
  instance_type = var.instance_type
  key_name      = var.key_name

  vpc_security_group_ids = [aws_security_group.knox_sg.id]

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install docker -y
              systemctl start docker
              systemctl enable docker
              usermod -aG docker ec2-user
              EOF

  tags = {
    Name = "knox-ec2"
  }
}
