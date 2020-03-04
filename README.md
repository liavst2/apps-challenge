# Apps Recommendation System

Filter applications and display on UI accroding to user's choice
The challenge was done on centOS (linux).

##### Running the application localy

<b>Note that you'll need to install nodejs as a prerequisite step.</b>
To run the application localy, execute the following command:
```sh
sh build.sh
```

When the script is finished, you will see the following message: "<strong>UI is avaliable on localhost:9898/apps</strong>"

##### Running the application in a Docker container

To run the application in a Docker container, execute the following commands:
```sh
docker build -t <YOUR_IMAGE_NAME_OF_CHOICE> -f docker/Dockerfile .
docker run -p 8081:9898 -d <YOUR_CHOSEN_IMAGE_NAME>
```

When the container is up, the UI will be available on localhost:8081/apps

Have fun :)
