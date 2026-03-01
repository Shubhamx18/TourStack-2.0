resource "aws_eks_cluster" "main" {
  name     = var.cluster_name
  role_arn = aws_iam_role.eks_cluster_role.arn

  vpc_config {
    subnet_ids = data.aws_subnets.default.ids
  }

  lifecycle {
    ignore_changes = all
  }

  depends_on = [
    aws_iam_role_policy_attachment.cluster_admin
  ]
}
