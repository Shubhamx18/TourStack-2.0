resource "aws_eks_cluster" "main" {
  name                          = var.cluster_name
  role_arn                      = aws_iam_role.eks_cluster_role.arn
  bootstrap_self_managed_addons = false

  vpc_config {
    subnet_ids = data.aws_subnets.default.ids
  }

  lifecycle {
    prevent_destroy = true
    ignore_changes  = [
      role_arn,
      bootstrap_self_managed_addons,
      version,
      tags,
      access_config,
    ]
  }
}
