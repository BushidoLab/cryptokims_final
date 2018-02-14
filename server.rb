require 'sinatra'



#Why/how do i add visuals to this page?

# get '/' do			#get methods takes two argumetns string: website
# 	p "#{Time.now}"	#block of ruby code executed when
# end

get '/' do
  send_file File.join(settings.public_folder, 'new_home.html')
end

get '/nometa' do
  send_file File.join(settings.public_folder, 'noMetaMaskInstalled.html')
end

# get '/kimsForSale' do
#   send_file File.join(settings.public_folder, 'kimsForSale.html')
# end

# get '/search' do
#   send_file File.join(settings.public_folder, 'searchForKim.html')
# end

get '/myKims' do
  send_file File.join(settings.public_folder, 'mykims.html')
end


# get '/test' do
#   send_file File.join(settings.public_folder, 'test.html')
# end
