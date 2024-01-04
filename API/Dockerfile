FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app

# copy csproj and restore as distinct layers
# restores all the dependencies in the working directory (contanier)
COPY *.csproj ./
RUN dotnet restore

# copy every thing else to the working directory and build
# -c configuration , -o specify out directory
COPY . ./
RUN dotnet publish -c Realease -o out

# build runtime image (create a smaller version without the heavy sdk)
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT [ "dotnet", "API.dll" ]