#! bin/bash
# updates linux
# sets up dotfile config files and ssh keys
# installs latest nvidia drivers

sudo apt-get update -y
sudo apt-get -o Dpkg::Options::=--force-confdef -o Dpkg::Options::=--force-confnew upgrade -y
sudo apt-get install emacs -y
sudo apt-get install gcc -y
sudo apt-get install nginx -y
sudo apt-get install awscli -y


# latest node - requires > 8.12
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 8

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn -y

# sudo apt-get install musescore -y
sudo apt-get autoremove -y
sudo apt-get autoclean -y

# install anaconda
CONDA_SH=Anaconda3-2019.03-Linux-x86_64.sh
curl -O https://repo.anaconda.com/archive/$CONDA_SH
bash $CONDA_SH -b
rm $CONDA_SH
. ~/anaconda3/etc/profile.d/conda.sh

# link bashrc things
if [ ! -d ~/dotfiles ]; then
    git clone https://github.com/bearpelican/dotfiles.git
    mv ~/.bashrc ~/.bashrc.bak
    ln -s ~/dotfiles/server/.bashrc ~/.bashrc
    source ~/.bashrc
    ln -bfs ~/dotfiles/home/.gitconfig ~/.gitconfig # backup, force, symbolic
    mkdir -p .jupyter/nbconfig
    ln -bfs ~/dotfiles/jupyter/notebook.json ~/.jupyter/nbconfig/notebook.json
    ln -bfs ~/dotfiles/server/.tmux.conf ~/.tmux.conf
    tmux source-file ~/.tmux.conf
fi




# Install midi_generator
git clone https://github.com/bearpelican/musicautobot.git
pushd musicautobot
conda env create -f environment.yml
popd

pushd musicautobot/data
DATA_FILE=numpy.tar.gz
wget https://ashaw-midi-web-server.s3-us-west-2.amazonaws.com/pretrained/vueapp/$DATA_FILE
tar -xf $DATA_FILE
rm $DATA_FILE
popd

# Hack to activate env from bash shell - https://stackoverflow.com/questions/34534513/calling-conda-source-activate-from-bash-script
eval "$(conda shell.bash hook)"
ENV=musicautobot
conda activate $ENV



# # Install vue_midi_generator
# git clone https://github.com/bearpelican/musicautobot_vueapp.git
# pushd musicautobot_vueapp
# conda env update -f environment.yml
# yarn install


# # Create midi environment
# # ENV=midi
# # ENV_BIN=~/anaconda3/envs/$ENV/bin
# # conda create -n $ENV python=3.7 -y

# # Hack to activate env from bash shell - https://stackoverflow.com/questions/34534513/calling-conda-source-activate-from-bash-script
# eval "$(conda shell.bash hook)"
# ENV=midi
# conda activate $ENV

# pushd app/api
# rm -rf data_serve
# DATA_FILE=data_serve.tar.gz
# wget https://ashaw-midi-web-server.s3-us-west-2.amazonaws.com/v18/$DATA_FILE
# tar -xf $DATA_FILE
# rm $DATA_FILE
# popd

# popd

# Enable proxy pass to server: 
# location / {
#         proxy_pass http://127.0.0.1:5000;
# }
# sudo mv /etc/nginx/sites-available/default /etc/nginx/sites-available/default.bak
# sudo emacs /etc/nginx/sites-available/default
# sudo service nginx restart

# Add aws credentials for to save predictions:
# `aws configure`



# to test:
# yarn build
# gunicorn --workers 8 run_guni:app -b 127.0.0.1:5000 --timeout 180

# to run:
# gunicorn -b 127.0.0.1:5000 run_guni:app  --timeout 180 --workers 48



# change bucket name - emacs ~/musicautobot/serve/api/api.cfg
#
# gunicorn -b 127.0.0.1:5000 run_guni:app  --timeout 180 --workers 2