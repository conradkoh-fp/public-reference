## Yoda Service
### Generating a new set of APIs
1. Modify the files in `services/yoda/design/design.go`
1. Run the command `goa gen yoda/design` to generate the interfaces


### Starting the service in development
```sh
S3_BUCKET=fp-apac-vendor-performance-dev-ap-southeast-1 \
DB_TABLE_NAME=fp-apac-jedi-dev-vendor-performance-data \
STAGE=dev \
go run cmd/yoda/main.go
```