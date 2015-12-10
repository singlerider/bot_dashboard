require 'net/http'
require 'uri'
require 'json'


# TODO replace with a real production host
server = "http://shane.gg/api/"

SCHEDULER.every '25s' do
  url = URI.parse("#{server}points/singlerider")
  http = Net::HTTP.new(url.host, url.port)
  response = http.request(Net::HTTP::Get.new(url.request_uri))

  # Convert to JSON
  j = JSON.parse(response.body)

  # Send the joke to the text widget
#  send_event("pokemon", { items: pokemon.values })


  # Sending to List widget, so map to :label and :value
  points = j['points']['totalPoints']
  print points
  send_event('treats',   { value: points })
end
