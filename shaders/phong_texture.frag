#version 300 es

precision mediump float;

in vec3 frag_pos;
in vec3 frag_normal;
in vec2 frag_texcoord;

uniform vec3 light_ambient;
uniform vec3 light_position;
uniform vec3 light_color;
uniform vec3 camera_position;
uniform vec3 material_color;      // Ka and Kd
uniform vec3 material_specular;   // Ks
uniform float material_shininess; // n
uniform sampler2D image;          // use in conjunction with Ka and Kd

out vec4 FragColor;

void main() {
    vec3 ambient = light_ambient * material_color;
    vec3 specular;
    vec3 diffuse;
    
    for(int i = 0; i < 10; i++)
    {
        vec3 light_vector = normalize(light_position[i] - frag_pos);
        float diffdot = dot(frag_normal, light_vector);
        if(diffdot < 0.0) 
        {
            diffdot = 0.0;
        }
        
        vec3 view_vector = normalize(camera_position - frag_pos);
        vec3 reflection = normalize(reflect(-light_vector, frag_normal));
        float specdot = dot(reflection, view_vector);
        if(specdot < 0.0)
        {
            specdot = 0.0;
        }

        diffuse += light_color[i] * material_color * diffdot;
        specular += light_color[i] * material_specular * pow(specdot, material_shininess);
    }
    FragColor = vec4(ambient + diffuse + specular, 1.0) * texture(image, frag_texcoord);
}
